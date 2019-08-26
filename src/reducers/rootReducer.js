const initState = {
  items: [
    { id: '1', name: 'item1', address: '999 N 1st St.', price: '30'},
    { id: '2', name: 'item2', address: '345 Avanida Nagolas', price: '27'},
    { id: '3', name: 'item3', address: '408 Gaucho Way', price: '37'},
    { id: '4', name: 'item4', address: '281 Hunolt St', price: '37'},
    { id: '5', name: 'item5', address: '290 Miramar Dr', price: '45'},
  ]
}

const rootReducer = (state = initState, action) => {
  console.log(action);
  if ( action.type === 'DELETE_ITEM') {
    let newItems = state.items.filter( item => {
      return action.id !== item.id;
    });

    return {
      ...state, items: newItems
    }
  }
  return state;
}

export default rootReducer;

