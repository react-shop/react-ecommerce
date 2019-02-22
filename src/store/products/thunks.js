import { 
  listProductsRequest, 
  listProductsFulfilled, 
  listProductsRejected,
  detailProductRequest,
  detailProductFulfilled,
  detailProductRejected
} from './actions'
import { listProducts, requestProduct } from './queries'

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

export const detailProduct = (token,id) => async (dispatch, getState) => {
  
  dispatch(detailProductRequest())
  const response = await requestProduct(token, id)
  
  if(!response.data) {
    const error = 'Fail load product'
    dispatch(detailProductRejected(error))

    throw 'Error' 
  }
  dispatch(detailProductFulfilled(response.data))
  return true
}