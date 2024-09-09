import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Routes from "./components/pages/Routes";
import ErrorWrapper from "./components/wrappers/ErrorWrapper";
import NotificationWrapper from "./components/wrappers/NotificationWrapper";

// @ts-expect-error ignoring while migrating to ts
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
