import React from "react";
import ReactDOM from "react-dom/client";
import NotificationWrapper from "./components/wrappers/NotificationWrapper";
import Routes from "./components/pages/Routes";
import ErrorWrapper from "./components/wrappers/ErrorWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorWrapper>
      <NotificationWrapper>
        <Routes />
      </NotificationWrapper>
    </ErrorWrapper>
  </React.StrictMode>,
);
