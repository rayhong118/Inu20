export const restaurantActionsConst = {
  DELETE_ITEM: 'DELETE_ITEM',
  DELETE_ITEM_ERROR: 'DELETE_ITEM_ERROR',
  EDIT_ITEM: 'EDIT_ITEM',
  EDIT_ITEM_ERROR: 'EDIT_ITEM_ERROR',
  ADD_ITEM: 'ADD_ITEM',
  ADD_ITEM_ERROR: 'ADD_ITEM_ERROR',
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_FILTER_TAGS: 'UPDATE_FILTER_TAGS',
};

export const deleteItem = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('restaurants')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: restaurantActionsConst.DELETE_ITEM });
      })
      .catch((err) => {
        dispatch({ type: restaurantActionsConst.DELETE_ITEM_ERROR, payload: err });
      });
  };
};

export const editItem = (item) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const restaurantRef = firestore.collection('restaurants');
    restaurantRef
      .where('address', '==', item.address)
      .get()
      .then((doc) => {
        if (doc.docs[0].id !== item.id) {
          dispatch({
            type: restaurantActionsConst.EDIT_ITEM_ERROR,
            payload: 'EDIT restaurant failed. This place already exist in the database',
          });
        } else {
          restaurantRef
            .doc(item.id)
            .update({
              name: item.name,
              address: item.address,
              url: item.url,
              price: item.price,
              comments: item.comments || '',
              tags: item.tags,
            })
            .then(() => {
              dispatch({ type: restaurantActionsConst.EDIT_ITEM });
            })
            .catch((err) => {
              dispatch({ type: restaurantActionsConst.EDIT_ITEM_ERROR, payload: err });
            });
        }
      });
  };
};

export const addItem = (item) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const restaurantRef = firestore.collection('restaurants');
    restaurantRef
      .where('address', '==', item.address)
      .get()
      .then(function (doc) {
        if (doc.size) {
          dispatch({
            type: restaurantActionsConst.ADD_ITEM_ERROR,
            payload: 'Add restaurant failed. This place already exist in the database',
          });
        } else {
          restaurantRef
            .add({
              name: item.name,
              address: item.address,
              url: item.url,
              price: item.price,
              comments: item.comments || '',
              tags: item.tags,
            })
            .then(() => {
              dispatch({ type: restaurantActionsConst.ADD_ITEM });
            })
            .catch((err) => {
              dispatch({ type: restaurantActionsConst.ADD_ITEM_ERROR, payload: err });
            });
        }
      });
  };
};

export const updateFilter = (filter) => {
  return { type: restaurantActionsConst.UPDATE_FILTER, filter };
};

export const updateFilterTags = (tags) => {
  return { type: restaurantActionsConst.UPDATE_FILTER_TAGS, tags };
};
