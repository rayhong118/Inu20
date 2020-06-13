const initState = {
  notificationConfig: { sec: 0, iconName: '', iconColor: '', title: '', text: '' },
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'HIDE_NOTIFICATION':
      console.log('reducer; hide', initState);
      return initState;
    case 'SHOW_NOTIFICATION':
      console.log('reducer; show', action);
      return { ...action };
    default:
      return state;
  }
};

export default notificationReducer;
