import { 
  addToCart,
  attCart,
  closeCart
} from './actions'

export const addCart = product => async (dispatch, getState) => {
  let sameProduct = getState().cart.list.filter((i) => i === product );
  console.log('mesmo', sameProduct)

  let productWithQuantity = getState().cart.list.map((c) => c.quantity = sameProduct.length)
  console.log('quantity', productWithQuantity)
  dispatch(addToCart(product))

  return true
}

export const removeCart = id => async (dispatch, getState) => {
  if(id > -1) {
  	getState().cart.list.splice(id, 1);
  }
  dispatch(attCart(getState().cart.list))
  return true
}

export const showCart = param => async (dispatch, getState) => {
  dispatch(closeCart(param))
  return true
}