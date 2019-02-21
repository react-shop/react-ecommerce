import { listProductsRequest, listProductsFulfilled, listProductsRejected } from './actions'
import { listProducts } from './queries'

export const requestProducts = token => async (dispatch, getState) => {
  
  dispatch(listProductsRequest())
  const response = await listProducts(token)
  
  if(!response.data) {
    const error = 'No have products'
    dispatch(listProductsRejected(error))

    throw 'Error' 
  }
  
  dispatch(listProductsFulfilled(response.data))
  return true
}