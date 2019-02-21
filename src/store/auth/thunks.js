import { signInRequest, signInFulfilled, signInRejected , signOut } from './actions'
import { requestLogin } from './queries'
import {SubmissionError} from 'redux-form'

export const login = user => async (dispatch, getState) => {
  // signRequest tem que ficar no comeco
  dispatch(signInRequest())
  const response = await requestLogin(user)
  
  if(!response.data) {
    const {errors} = response;
    dispatch(signInRejected(errors.message))

    throw new SubmissionError(errors ? errors : {_error: errors.message})
  }
  
  // signInFulfilled tem que ficar no final com o response.data ou reponse.data.user depende da resposta da api
  dispatch(signInFulfilled(response.data))
  return true
}

export const logout = user => async (dispatch, getState) => {
  dispatch(signOut())
  return true
}