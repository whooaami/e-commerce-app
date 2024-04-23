import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import useSWR, { mutate } from "swr";
import { fetcher } from "../helpers/axios";
import { getUser, getAccessToken } from "../hooks/user.actions";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import Error from "../components/Error";
import Loading from "../components/Loading";

function WishList() {
  const { data: savedListData, error: savedListError } = useSWR(
    `/saved-list/`,
    fetcher
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (savedListData) {
      setLoading(false);
    }
  }, [savedListData]);

  if (savedListError) {
    return <Error message="Error fetching saved list!" />;
  }

  if (loading) {
    return <Loading />;
  }

  const handleDeleteItem = async (id) => {
    try {
      const url = `http://localhost:8000/api/saved-list/${id}/`;
      console.log("Sending request to:", url);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          user: getUser().id,
          products: id,
        }),
      });
      mutate("/saved-list/");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Layout>
      <div className="d-flex align-items-center mb-3">
        <BackButton />
      </div>
      <h2 className="text-center mb-4">Saved List</h2>
      {savedListData && savedListData.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedListData.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link
                    to={`/category/${item.id}/products/${item.products.id}`}
                  >
                    {item.products.name}
                  </Link>
                </td>
                <td>{item.products.description}</td>
                <td>{item.products.price}</td>
                <td>
                  <Link
                    to={`/category/${item.id}/products/${item.products.id}`}
                  >
                    <img
                      src={`http://localhost:8000${item.products.image}`}
                      alt={item.products.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="text-center mt-5">
          <h3>No products in the saved list</h3>
        </div>
      )}
    </Layout>
  );
}

export default WishList;
