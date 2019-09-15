const initState = {
  items: []
}

const restaurantReducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      return state;
    case 'ADD_ITEM_ERROR':
      return state;
    case 'EDIT_ITEM':
      return state;
    case 'DELETE_ITEM':
      return state;
    default:
      return state;
  }
}

export default restaurantReducer;