import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Text from '../../../layout/styled-components/title'
import { required } from '../../../../utils/validators'
import inputText from '../components/inputText'
import { ClipLoader } from 'react-spinners'

class LoginForm extends React.Component {
  render() {
    const {handleSubmit, submitting, error} = this.props;

    return (
      <div>
        { !!error && <spam>{error}</spam> }
        <Field
          validate={[required]}
          name="username"
          component={inputText}
          returnKeyType="next"
          type="text"
          label='Usuário' />

      <Field
          validate={[required]}
          name="password"
          component={inputText}
          returnKeyType="send"
          type="password"
          label='Senha' />
      <button onClick={handleSubmit}>
        { submitting ? 
        <ClipLoader
          sizeUnit={"px"}
          size={20}
          color={'#123abc'}
        /> : <Text>Entrar</Text> }
      </button>
      </div>
    )
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)