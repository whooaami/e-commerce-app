import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import useSWR, { mutate } from "swr";
import { fetcher } from "../helpers/axios";
import { getUser, getAccessToken } from "../hooks/user.actions";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import Error from "../components/Error";
import Loading from "../components/Loading";

function Cart() {
  const { data: cartData, error: cartError } = useSWR(`/cart/`, fetcher);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cartData) {
      setLoading(false);

      let total = 0;
      cartData.forEach((cartItem) => {
        if (
          cartItem.product_info &&
          cartItem.product_info.price &&
          cartItem.product_info.quantity
        ) {
          total += cartItem.product_info.price * cartItem.product_info.quantity;
        }
      });
      setTotalPrice(total);
    }
  }, [cartData]);

  const handleDeleteItem = async (id) => {
    try {
      const url = `http://localhost:8000/api/cart/${id}/`;
      console.log("Sending request to:", url);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          user: getUser().id,
          product: id,
        }),
      });
      mutate("/cart/");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      const url = `http://localhost:8000/api/cart/${id}/`;
      console.log("Sending request to:", url);
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          quantity: quantity,
        }),
      });
      mutate("/cart/");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (cartError) {
    return <Error message="Error fetching cart!" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="d-flex align-items-center mb-3">
        <BackButton />
      </div>
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartData && cartData.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>{cartItem.product_info.name}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={cartItem.quantity}
                      onChange={(e) =>
                        handleQuantityChange(cartItem.id, e.target.value)
                      }
                      style={{ width: "60px" }}
                      placeholder={cartItem.product_info.quantity}
                    />
                  </td>
                  <td>
                    {cartItem.product_info.price &&
                      cartItem.product_info.quantity &&
                      (
                        cartItem.product_info.price *
                        cartItem.product_info.quantity
                      ).toFixed(2)}
                  </td>
                  <td>
                    <img
                      src={cartItem.product_info.image}
                      alt={cartItem.product_info.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteItem(cartItem.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-center mt-4">
            <p>Total Price: {totalPrice.toFixed(2)} грн</p>
            <Button variant="primary">Proceed to Checkout</Button>
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <h3>No products in the cart</h3>
        </div>
      )}
    </Layout>
  );
}

export default Cart;
