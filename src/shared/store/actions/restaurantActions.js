export const deleteItem = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('restaurants').doc(id).delete()
    .then(() => {
      dispatch({ type: 'DELETE_ITEM' });
    }).catch( (err) => {
      dispatch({ type: 'DELETE_ITEM_ERROR', err });
    })
  }
}

export const editItem = (item) => {
  //==================================
  // NOT FIXED YET, UPDATE MIGHT NEED TO QUERY FIRST
  //==================================
  console.log({...item});
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('restaurants').doc(item.id).update(
      {...item}
    ).then( () => {
      dispatch({ type: 'EDIT_ITEM' });
    }).catch( (err) => {
      dispatch({ type: 'EDIT_ITEM_ERROR', err });
    })
  }
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