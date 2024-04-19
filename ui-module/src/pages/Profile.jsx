import React from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { getUser } from "../hooks/user.actions";
import Layout from "../components/Layout";
import "../pages/css/Profile.css";

function Profile() {
  const user = getUser();

  if (!user) {
    return (
      <div>Будь ласка, увійдіть у систему, щоб переглянути цю сторінку.</div>
    );
  }

  return (
    <Layout>
      <div className="context px-4">
        <h1 className="text-primary">Profile</h1>
      </div>
      <div className="profile-container">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Ім'я користувача</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ім'я"
                  value={user.username}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>Ім'я</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ім'я"
                  value={user.first_name}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Прізвище</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Прізвище"
                  value={user.last_name}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    readOnly
                  />
                  <Button variant="secondary">Змінити</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Profile;
