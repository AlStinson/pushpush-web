import { node } from "prop-types";
import React from "react";
import { useCallback, useState } from "react";

import NotificationContext from "../../context/NotificationContext";
import Notification from "../styles/Notification";

const NOTIFICATION_LIVE_TIME_MS = 5000;

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
      NOTIFICATION_LIVE_TIME_MS,
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
  children: node.isRequired,
};

export default NotificationWrapper;
