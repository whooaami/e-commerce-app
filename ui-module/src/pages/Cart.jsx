import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const handleCheckout = async () => {
    try {
      if (!cartData || cartData.length === 0) {
        console.error("No items in the cart");
        return;
      }

      const orderItems = cartData.map((item) => ({
        product: {
          name: item.product_info.name,
          description: item.product_info.description,
          price: item.product_info.price,
          image: item.product_info.image,
          quantity: item.quantity,
        },
        quantity: item.quantity,
      }));

      const payload = {
        user: getUser().id,
        status: "Pending",
        shipping_address: "",
        order_items: orderItems,
      };

      const url = "http://localhost:8000/api/orders/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
      } else {
        console.error("Error creating order:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating order:", error);
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
                  <td>
                    <Link
                      to={`/category/${cartItem.id}/products/${cartItem.product_info.id}`}
                    >
                      {cartItem.product_info.name}
                    </Link>
                  </td>
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
                    <Link
                      to={`/category/${cartItem.id}/products/${cartItem.product_info.id}`}
                    >
                      <img
                        src={cartItem.product_info.image}
                        alt={cartItem.product_info.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Link>
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
            <Link to="/order/">
              <Button variant="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Link>
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
