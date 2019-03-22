import {
  listSpotlightsRequest,
  listSpotlightsFulfilled,
  listSpotlightsRejected,
  listProductsRequest, 
  listProductsFulfilled, 
  listProductsRejected,
  detailProductRequest,
  detailProductFulfilled,
  detailProductRejected,
  attProducts
} from './actions'
import { listProducts, requestProduct, listSpotlights } from './queries'

export const requestHighlights = () => async (dispatch, getState) => {
  
  dispatch(listSpotlightsRequest())
  const response = await listSpotlights()
  
  if(!response.data) {
    const error = 'No have products'
    dispatch(listSpotlightsRejected(error))

    throw 'Error' 
  }
  
  dispatch(listSpotlightsFulfilled(response.data))
  return true
}



export const requestProducts = () => async (dispatch, getState) => {
  
  dispatch(listProductsRequest())
  const response = await listProducts()
  
  if(!response.data) {
    const error = 'No have products'
    dispatch(listProductsRejected(error))

    throw 'Error' 
  }
  
  dispatch(listProductsFulfilled(response.data))
  return true
}

export const detailProduct = (id) => async (dispatch, getState) => {
  
  dispatch(detailProductRequest())
  const response = await requestProduct(id)
  
  if(!response.data) {
    const error = 'Fail load product'
    dispatch(detailProductRejected(error))

    throw 'Error' 
  }
  dispatch(detailProductFulfilled(response.data))
  return true
}

export const filterProducts = (filtered) => async (dispatch, getState) => {
  dispatch(attProducts(filtered))

  return true
}