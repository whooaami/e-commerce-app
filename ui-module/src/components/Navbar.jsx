import React from "react";
import { randomAvatar } from "../utils";

import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navigationbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login/");
  };

  const handleCartClick = () => {
    navigate("/cart/");
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand className="fw-bold" href="#home">
          MyShop
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link onClick={handleCartClick}>
              <FaShoppingCart size={36} />
            </Nav.Link>
            <NavDropdown
              title={
                <Image
                  src={randomAvatar()}
                  roundedCircle
                  width={36}
                  height={36}
                />
              }
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
