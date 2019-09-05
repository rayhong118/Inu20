export const getItem = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    
    const firestore = getFirestore();
    firestore.collection('restaurants').get().then( ()=> {
      dispatch({ type: 'GET_ITEMS' });
    }).catch( (err) => {
      dispatch({ type: 'GET_ITEMS_ERROR', err });
    })
    
  }
}

export const deleteItem = (id) => {
  return {
    type: 'DELETE_ITEM',
    id
  }
}

export const editItem = (item) => {
  return{
    type: 'ADD_ITEM',
    item
  }
}