export const deleteItem = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('restaurants').doc(id).delete()
    .then(()=> {
      dispatch({ type: 'DELETE_ITEM' });
    }).catch( (err) => {
      dispatch({ type: 'DELETE_ITEM_ERROR', err });
    })
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