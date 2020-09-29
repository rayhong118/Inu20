export const notificationActionConst = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION',
};
export const showNotification = (notificationConfig) => {
  return { type: notificationActionConst.SHOW_NOTIFICATION, notificationConfig };
};

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' };
};

export class NotificationConfig {
  constructor(sec, iconColor, iconName, title, text) {
    this.sec = sec || 0;
    this.iconColor = iconColor || '';
    this.iconName = iconName || '';
    this.title = title || '';
    this.text = text || '';
  }
}
