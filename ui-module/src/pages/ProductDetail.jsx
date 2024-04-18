import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Card, Button } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { category_pk, pk } = useParams(); // Додано pk
  const { data: responseData, error } = useSWR(`/category/${category_pk}/products/${pk}/`, fetcher);

  if (error) {
    return <div>Error fetching product!</div>; // Виправлено текст помилки
  }

  if (!responseData) {
    return <div>Loading...</div>;
  }

  // Тепер не потрібно перевіряти, чи products є масивом, бо ми очікуємо лише один продукт

  const product = responseData; // Замінено products на product, тому що це єдиний продукт

  return (
    <Layout>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4"> {/* Виправлено відступи */}
          <Card>
            <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=${product.name}`} />
            <Card.Body>
              <Card.Title>Name: {product.name}</Card.Title>
              <Card.Text>Description: {product.description}</Card.Text>
              <Card.Text>Price: {product.price}</Card.Text>
              <Card.Text>Quantity: {product.quantity}</Card.Text>
              <Button variant="success" className="me-4">Купити</Button>
              <Button variant="primary">Зберегти</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default ProductDetail;
