import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Card } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Link } from "react-router-dom";

function Home() {
  const { data: categories, error } = useSWR("/category/", fetcher);

  if (error) {
    return <div>Error fetching categories!</div>;
  }

  if (!categories) {
    return <div>Loading...</div>;
  }

  // Перевірка, чи categories.results є масивом
  if (!Array.isArray(categories.results)) {
    // Якщо categories.results не є масивом, виводимо повідомлення про помилку
    console.error("Categories data is not an array:", categories);
    return <div>Error: Categories data is not an array</div>;
  }

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedCategories = chunkArray(categories.results, 3);

  return (
    <Layout>
      {chunkedCategories.map((row, rowIndex) => (
        <Row key={rowIndex} className="justify-content-center mb-4">
          {row.map((category) => (
            <Col key={category.id} xs={6} sm={4} lg={3} className="mb-4">
              <Link to={`/category/${category.id}/products`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
