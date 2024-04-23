import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetcher } from "../helpers/axios";
import { getAccessToken } from "../hooks/user.actions";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetcher("/orders/", {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        setOrders(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      let total = 0;
      orders.forEach((order) => {
        order.order_items.forEach((item) => {
          total += item.product.price * item.quantity;
        });
      });
      setTotalPrice(total);
    }
  }, [orders]);

  const handleShippingAddressChange = async (e, orderId) => {
    const newShippingAddress = e.target.value;
    try {
      const url = `http://localhost:8000/api/orders/${orderId}/`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          shipping_address: newShippingAddress,
        }),
      });
      if (response.ok) {
        const updatedOrders = orders.map((order) => {
          if (order.id === orderId) {
            return { ...order, shipping_address: newShippingAddress };
          }
          return order;
        });
        setOrders(updatedOrders);
      } else {
        console.error("Error updating shipping address:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating shipping address:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const url = `http://localhost:8000/api/orders/${orderId}/`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (response.ok) {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        toast.success('Order deleted successfully!');
      } else {
        console.error("Error deleting order:", response.statusText);
        toast.error('Error deleting order!');
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="d-flex align-items-center mb-3">
        <BackButton />
      </div>
      <h2 className="text-center mb-4">Orders</h2>
      {orders && orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Order</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  Delete
                </button>
              </div>
              <div className="card-body">
                <p className="card-text">Status: {order.status}</p>
                <div className="form-group">
                  <label
                    htmlFor={`shippingAddress_${order.id}`}
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Enter your address:
                  </label>
                  <input
                    type="text"
                    id={`shippingAddress_${order.id}`}
                    className="form-control"
                    value={order.shipping_address}
                    onChange={(e) => handleShippingAddressChange(e, order.id)}
                    style={{ width: "250px" }}
                  />
                </div>

                <Table striped bordered hover style={{ marginTop: "20px" }}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{item.product.description}</td>
                        <td>{item.product.price}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          ))}
          <div className="text-center mt-5">
            <p>Total Price: {totalPrice.toFixed(2)} грн</p>
            <Link to="/order/confirm/" className="btn btn-success">
              Confirm order
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <h3>No orders found!</h3>
        </div>
      )}
    </Layout>
  );
}

export default Order;
