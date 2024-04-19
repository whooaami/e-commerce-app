import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Row, Col, Card, Button } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";
import { getAccessToken } from "../hooks/user.actions";

function ProductDetail() {
  const { category_pk, pk } = useParams();
  const navigate = useNavigate();
  const { data: responseData, error } = useSWR(
    `/category/${category_pk}/products/${pk}/`,
    fetcher
  );

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/login"); // Redirect to login page if user is not authenticated
    }
  }, [navigate]);

  const handleBuyClick = async () => {
    try {
      const url = `http://localhost:8000/api/cart/`; // Оновлено URL для відправки в корзину
      console.log("Sending request to:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`, // Замінено localStorage.getItem("auth") на функцію отримання токену доступу
        },
        body: JSON.stringify({
          user: getUser().id, // Використано функцію для отримання ідентифікатора користувача
          product: pk,
        }),
      });
      if (response.ok) {
        console.log("Product added to cart successfully");
        // Перенаправлення на сторінку корзини після успішного додавання в корзину
        navigate("/cart/");
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (error) {
    return <div>Error fetching product!</div>;
  }

  if (!responseData) {
    return <div>Loading...</div>;
  }

  const product = responseData;

  return (
    <Layout>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={`https://via.placeholder.com/300x200?text=${product.name}`}
            />
            <Card.Body>
              <Card.Title>Name: {product.name}</Card.Title>
              <Card.Text>Description: {product.description}</Card.Text>
              <Card.Text>Price: {product.price}</Card.Text>
              <Card.Text>Quantity: {product.quantity}</Card.Text>
              <Button
                variant="success"
                className="me-4"
                onClick={handleBuyClick}
              >
                Купити
              </Button>
              <Button variant="primary">Зберегти</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default ProductDetail;
