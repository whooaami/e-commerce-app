import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Layout from "../components/Layout";
import Error from "../components/Error";
import Loading from "../components/Loading";

function Home() {
  const { data: categories, error } = useSWR("/category/", fetcher);

  if (error) {
    return <Error message="Error fetching categories!" />;
  }

  if (!categories) {
    return <Loading />;
  }

  if (!Array.isArray(categories)) {
    console.error("Categories data is not an array:", categories);
    return <Error message="Error: Categories data is not an array" />;
  }

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedCategories = chunkArray(categories, 3);

  return (
    <Layout>
      {chunkedCategories.map((row, rowIndex) => (
        <Row key={rowIndex} className="justify-content-center mb-4">
          {row.map((category) => (
            <Col key={category.id} xs={6} sm={4} lg={3} className="mb-4">
              <Link
                to={`/category/${category.id}/products`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card>
                  <Card.Img variant="top" src={category.image} />
                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </Layout>
  );
}

export default Home;
