import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";

function Cart() {
  const { data: cartData, error: cartError } = useSWR(`/cart/`, fetcher);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cartData) {
      setLoading(false);
    }
  }, [cartData]);

  if (cartError) {
    return <div>Error fetching cart!</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="d-flex align-items-center mb-3">
        <BackButton />
      </div>
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartData && cartData.length > 0 ? (
        <Row className="justify-content-center">
          {cartData.map((cartItem) => (
            <Col key={cartItem.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={cartItem.product_info.image} />
                <Card.Body>
                  <Card.Title>{cartItem.product_info.name}</Card.Title>
                  <Card.Text>Price: {cartItem.product_info.price}</Card.Text>
                  <Card.Text>Quantity: {cartItem.quantity}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-5">
          <h3>No products in the cart</h3>
        </div>
      )}
      <div className="text-center mt-4">
        <Button variant="primary">Proceed to Checkout</Button>
      </div>
    </Layout>
  );
}

export default Cart;
