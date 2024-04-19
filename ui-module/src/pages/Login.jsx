import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import "../pages/css/Auth.css";

function Login() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div className="content px-4">
            <h1 className="text-primary">Welcome to MyShop!</h1>
            <p className="content">
              Login now and start enjoying! <br />
              Or if you don't have an account, please{" "}
              <Link to="/register/">register</Link>.
            </p>
          </div>
        </div>
        <div className="col-md-6 p-5 mx-auto form-wrapper">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
