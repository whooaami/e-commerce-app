import React from "react";
import { Alert } from "react-bootstrap";
import Layout from "../components/Layout";

const Error = ({ message }) => {
  return (
    <Layout>
        <Alert variant="danger" className="error-page">
            <Alert.Heading>Error</Alert.Heading>
            <p>{message}</p>
        </Alert>
    </Layout>
  );
};

export default Error;
