const initState = {
  items: [],
  error: '',
  filter: {
    searchText: '',
    order: '',
    minPrice: 0,
    maxPrice: 0,
    tags: [],
  },
};

const restaurantReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state;
    case 'ADD_ITEM_ERROR':
      return { ...state, error: action.payload };
    case 'EDIT_ITEM':
      return state;
    case 'EDIT_ITEM_ERROR':
      return { ...state, error: action.payload };
    case 'DELETE_ITEM':
      return state;
    case 'DELETE_ITEM_ERROR':
      return { ...state, error: action.payload.message };
    case 'UPDATE_FILTER':
      return { ...state, filter: action.filter };
    case 'UPDATE_FILTER_TAGS':
      return { ...state, filter: { ...state.filter, tags: action } };
    default:
      return state;
  }
};

export default restaurantReducer;
