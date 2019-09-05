import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';

const initState = {
  items: []
}

const restaurantReducer = (state = initState, action) => {
  if ( action.type === 'GET_ITEMS') {
    return state;
  }
  if ( action.type === 'GET_ITEMS_ERROR') {
    console.log(action.err);
    return state;
  }
  
  if ( action.type === 'DELETE_ITEM') {
    let newItems = state.items.filter( item => {
      return action.id !== item.id;
    });

    return {
      ...state, items: newItems
    }
  }
  else if (action.type === 'ADD_ITEM') {
    console.log(action.item);
    let newItems = state.items.filter( item => {
      return action.item.id !== item.id;
    });

    newItems.push(action.item);
    
    return {
      ...state, items: newItems
    }
  }
  return state;
}

const rootReducer = combineReducers({
  restaurant: restaurantReducer,
  firestore: firestoreReducer
});

export default rootReducer;

