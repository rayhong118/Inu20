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