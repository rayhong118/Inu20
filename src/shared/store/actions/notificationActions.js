export const showNotification = (notificationConfig) => {
  return { type: 'SHOW_NOTIFICATION', notificationConfig };
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
