import React from "react";
import { Link, useLocation } from "react-router-dom";

const Error = () => {
  const { state } = useLocation();

  return (
    <>
      <h2> Error! </h2>
      <p>{state}</p>
      <Link to="/">Go back to main menu</Link>
    </>
  );
};

export default Error;
