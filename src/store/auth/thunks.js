import { signInRequest, signInFulfilled, signInRejected , signOut } from './actions'
import { test } from './queries'

export const login = user => async (dispatch, getState) => {
  // signRequest tem que ficar no comeco
  dispatch(signInRequest())
  const response = await test(user)
  console.log('response', response)
  
  if(!response.data) {
    const {errors, message} = response;
    console.log('Erro no login')
    dispatch(signInRejected(errors || message))
  }
  
  // signInFulfilled tem que ficar no final com o response.data ou reponse.data.user depende da resposta da api
  dispatch(signInFulfilled(response.data))
  return true
}

export const logout = user => async (dispatch, getState) => {
  dispatch(signOut())
  return true
}