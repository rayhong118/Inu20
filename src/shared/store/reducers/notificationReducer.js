const initState = {
  notificationConfig: { sec: 0, iconName: '', iconColor: '', title: '', text: '' },
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'HIDE_NOTIFICATION':
      return initState;
    case 'SHOW_NOTIFICATION':
      return { ...action };
  }
};

export default notificationReducer;
