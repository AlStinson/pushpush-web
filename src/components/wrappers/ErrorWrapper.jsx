import React from "react";
import { node } from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate } from "react-router-dom";

const ErrorWrapper = (props) => (
  <ErrorBoundary
    fallback={({ error }) => <Navigate to={"/error"} state={error} />}
  >
    {props.children}
  </ErrorBoundary>
);

ErrorWrapper.propTypes = {
  children: node,
};

export default ErrorWrapper;
