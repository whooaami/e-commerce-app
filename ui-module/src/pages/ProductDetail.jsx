import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from "../hooks/user.actions";
import { getAccessToken } from "../hooks/user.actions";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import Error from "../components/Error";
import Loading from "../components/Loading";


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
      navigate("/login");
    }
  }, [navigate]);

  const handleBuyClick = async () => {
    try {
      const url = `http://localhost:8000/api/cart/`;
      console.log("Sending request to:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          user: getUser().id,
          product: pk,
        }),
      });
      if (response.ok) {
        console.log("Product added to cart successfully");
        toast.success('Product added to cart successfully');
        navigate("/cart/");
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const url = `http://localhost:8000/api/saved-list/`;
      console.log("Sending request to:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          user: getUser().id,
          products: pk,
        }),
      });
      if (response.ok) {
        console.log("Product added to saved list successfully");
        toast.success('Product added to saved list successfully');
      } else {
        throw new Error("Failed to add product to saved list");
      }
    } catch (error) {
      console.error("Error adding product to saved list:", error);
    }
  };

  if (error) {
    return <Error message="Error fetching product!" />;
  }

  if (!responseData) {
    return <Loading />;
  }

  const product = responseData;

  return (
    <Layout>
      <div className="d-flex align-items-center mb-3">
        <BackButton />
      </div>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={product.image}
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
                Buy
              </Button>
              <Button
                variant="primary"
                className="me-4"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default ProductDetail;
