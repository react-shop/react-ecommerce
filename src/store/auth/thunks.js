import { signInRequest, signInRejected , signOut } from './actions'
import { test } from './queries'

export const login = user => async (dispatch, getState) => {
  const response = await test(user)
  console.log('response', response)
  
  if(!response.data) {
    const {errors, message} = response;
    console.log('Erro no login')
    dispatch(signInRejected(errors || message))
  }
  
  dispatch(signInRequest(user))
  return true
}

export const logout = user => async (dispatch, getState) => {
  dispatch(signOut())
  return true
}