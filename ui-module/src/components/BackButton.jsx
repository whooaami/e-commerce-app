import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className="btn btn-link" onClick={goBack}>
      <BiArrowBack style={{ fontSize: "30px" }} />
    </button>
  );
};

export default BackButton;
