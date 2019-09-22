export const deleteItem = (id) => {
  return {
    type: 'DELETE_ITEM',
    id
  }
}

export const editItem = (item) => {
  return { type: 'EDIT_ITEMS' }
    
}
export const addItem = (item) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('restaurants').add(
      item
    ).then( ()=> {
      dispatch({ type: 'ADD_ITEM' });
    }).catch( (err) => {
      dispatch({ type: 'ADD_ITEM_ERROR', err });
    })
    
  }
}