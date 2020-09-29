import { notificationActionConst } from '../actions/notificationActions';

const initState = {
  notificationConfig: { sec: 0, iconName: '', iconColor: '', title: '', text: '' },
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case notificationActionConst.HIDE_NOTIFICATION:
      return initState;
    case notificationActionConst.SHOW_NOTIFICATION:
      return { ...action };
    default:
      return state;
  }
};

export default notificationReducer;
