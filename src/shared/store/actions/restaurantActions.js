export const deleteItem = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('restaurants')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_ITEM' });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'DELETE_ITEM_ERROR', payload: err });
      });
  };
};

export const editItem = (item) => {
  console.log({ ...item });
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('restaurants')
      .doc(item.id)
      .update({
        name: item.name,
        address: item.address,
        url: item.url,
        price: item.price,
        comments: item.comments || '',
      })
      .then(() => {
        dispatch({ type: 'EDIT_ITEM' });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'EDIT_ITEM_ERROR', err });
      });
  };
};

export const addItem = (item) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('restaurants')
      .add({
        name: item.name,
        address: item.address,
        url: item.url,
        price: item.price,
        comments: item.comments || '',
      })
      .then(() => {
        dispatch({ type: 'ADD_ITEM' });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'ADD_ITEM_ERROR', err });
      });
  };
};

export const updateFilter = (filter) => {
  return { type: 'UPDATE_FILTER', filter };
};
