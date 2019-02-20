import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Form from '../components/form'
import LogoForm from '../components/logoForm'
import Icon from '../components/icon'
import Text from '../components/text'
import Button from '../components/button'
import { required } from '../../../../utils/validators'
import inputText from '../components/inputText'
import { ClipLoader } from 'react-spinners'

class LoginForm extends React.Component {
  render() {
    const {handleSubmit, submitting, error} = this.props;

    return (
      <Form>
        <LogoForm>
          <Icon className="fa fa-apple-alt"/>
        </LogoForm>
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
      <Button onClick={handleSubmit}>
        { submitting ? 
        <ClipLoader
          sizeUnit={"px"}
          size={20}
          color={'#123abc'}
        /> : <Text>Entrar</Text> }
      </Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)