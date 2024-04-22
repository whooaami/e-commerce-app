import React from "react";
import { Spinner } from "react-bootstrap";
import Layout from "../components/Layout";

const Loading = () => {
  return (
    <Layout>
        <div className="loading-page">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <p>Loading...</p>
        </div>
    </Layout>
  );
};

export default Loading;
