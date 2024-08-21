import React from "react";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
import Notification from "../styles/Notification";

const NotificationWrapper = (props) => {
  const [notification, setNotification] = useState(null);

  const addNotification = useCallback((message) => {
    const id = Date.now();
    const notification = { id, message };
    setNotification(notification);
    setTimeout(
      () =>
        setNotification((prev) => {
          if (prev === notification) setNotification(null);
        }),
      5000,
    );
  }, []);

  return (
    <NotificationContext.Provider value={addNotification}>
      {notification && <Notification>{notification.message}</Notification>}
      {props.children}
    </NotificationContext.Provider>
  );
};

NotificationWrapper.propTypes = {
  children: PropTypes.node,
};

export default NotificationWrapper;
