import { restaurantActionsConst } from '../actions/restaurantActions';

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
    case restaurantActionsConst.ADD_ITEM:
      return state;
    case restaurantActionsConst.ADD_ITEM_ERROR:
      return { ...state, error: action.payload };
    case restaurantActionsConst.EDIT_ITEM:
      return state;
    case restaurantActionsConst.EDIT_ITEM_ERROR:
      return { ...state, error: action.payload };
    case restaurantActionsConst.DELETE_ITEM:
      return state;
    case restaurantActionsConst.DELETE_ITEM_ERROR:
      return { ...state, error: action.payload.message };
    case restaurantActionsConst.UPDATE_FILTER:
      return { ...state, filter: action.filter };
    case restaurantActionsConst.UPDATE_FILTER_TAGS:
      return { ...state, filter: { ...state.filter, tags: action.tags } };
    default:
      return state;
  }
};

export default restaurantReducer;
