import React from "react";
import { Spinner } from "react-bootstrap";
import Layout from "../components/Layout";

const Loading = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center loading-page">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    </Layout>
  );
};

export default Loading;
