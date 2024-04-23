import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Layout from "../components/Layout";

const OrderConfirm = () => {
  return (
    <Layout>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">Order Confirmation</Card.Title>
                <Card.Text className="text-center">
                  Thank you for your order!
                </Card.Text>
                <Card.Text className="text-center">
                  Your order has been successfully placed.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button variant="primary" className="mt-3" href="/">Continue Shopping</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default OrderConfirm;
