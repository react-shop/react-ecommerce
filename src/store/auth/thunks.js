import { signIn, signOut } from './actions'
import { test } from './queries'

export const login = user => async (dispatch, getState) => {
  const response = await test(user)
  console.log('response', response)
  
  if(!response) {
    console.log('Erro no login')
  }
  
  dispatch(signIn(user))
  return true
}

export const logout = user => async (dispatch, getState) => {
  dispatch(signOut())
  return true
}