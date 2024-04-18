import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { useParams } from "react-router-dom";

function CategoryProducts() {
  const { category_pk } = useParams();
  const { data: responseData, error } = useSWR(`/category/${category_pk}/products/`, fetcher);

  if (error) {
    return <div>Error fetching products!</div>;
  }

  if (!responseData) {
    return <div>Loading...</div>;
  }

  // Перевірка наявності масиву продуктів у відповіді
  if (!Array.isArray(responseData.results)) {
    console.error("Products data is not an array:", responseData);
    return <div>Error: Products data is not an array</div>;
  }

  const products = responseData.results;

  return (
    <Layout>
      <Row className="justify-content-center">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Link to={`/category/${category_pk}/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card>
                <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=${product.name}`} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
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
