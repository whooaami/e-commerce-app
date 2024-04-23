import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import Error from "../components/Error";
import Loading from "../components/Loading";

function CategoryProducts() {
  const { category_pk } = useParams();
  const { data: responseData, error } = useSWR(`/category/${category_pk}/products/`, fetcher);

  if (error) {
    return <Error message="Error fetching products!" />;
  }

  if (!responseData) {
    return <Loading />;
  }

  if (!Array.isArray(responseData)) {
    console.error("Products data is not an array:", responseData);
    return <Error message="Error: Products data is not an array" />;
  }

  const products = responseData;

  return (
    <Layout>
      <div className="d-flex align-items-center mb-3">
        <BackButton />
      </div>
      <Row className="justify-content-center">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Link to={`/category/${category_pk}/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>{product.price} грн</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default CategoryProducts;
