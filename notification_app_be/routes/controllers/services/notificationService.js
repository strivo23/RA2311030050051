let notifications = [];

exports.saveNotification = (data) => {
  notifications.push(data);
  return { success: true, data };
};

exports.fetchNotifications = () => {
  return notifications;
};