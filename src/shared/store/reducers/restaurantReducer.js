const initState = {
  items: [],
  error: '',
  filter: {
    order: '',
    maxPrice: 0,
    minPrice: 0,
    name: '',
  },
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
      return { ...state, error: action.payload.message };
    case 'UPDATE_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default restaurantReducer;
