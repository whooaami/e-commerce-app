import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/authentication/RegistrationForm";

function Registration() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div className="content px-4">
            <h1 className="text-primary">Welcome to the MyShop!</h1>
            <p className="content">
              This is a new e-commerce site that will allow you to buy whatever
              you want. <br />
              Just enjoy with us. Register now and start
              enjoying! <br />
              Or if you already have an account, please{" "}
              <Link to="/login/">login</Link>.
            </p>
          </div>
        </div>
        <div className="col-md-6 p-5">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

export default Registration;
