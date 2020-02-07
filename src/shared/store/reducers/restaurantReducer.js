const initState = {
  items: [],
  error: '',
};

const restaurantReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state;
    case 'ADD_ITEM_ERROR':
      return state;
    case 'EDIT_ITEM':
      return state;
    case 'EDIT_ITEM_ERROR':
      return state;
    case 'DELETE_ITEM':
      return state;
    case 'DELETE_ITEM_ERROR':
      console.log(action);
      console.log(action.payload.message);

      return { ...state, error: action.payload.message };
    default:
      return state;
  }
};

export default restaurantReducer;
