import React from 'react'
import { Field, reduxForm, submit } from 'redux-form'
import { connect } from 'react-redux'
import Form from '../components/form'
import LogoForm from '../components/logoForm'
import Icon from '../components/icon'
import Text from '../components/text'
import Button from '../components/button'
import Error from '../components/error'
import { required } from '../../../../utils/validators'
import inputText from '../components/inputText'
import { ClipLoader } from 'react-spinners'

class LoginForm extends React.Component {

  handleKeyPress = async(e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      return await this.props.dispatch(submit('loginForm'))
    }
  }

  render() {
    const {handleSubmit, onKeyDown, submitting, error, auth} = this.props;

    return (
      <Form onKeyDown={(e) => this.handleKeyPress(e)}>
        <LogoForm>
          <Icon className="fa fa-crown"/>
        </LogoForm>
        { !!error && <Error>{error}</Error> }
        <Field
          validate={[required]}
          name="username"
          component={inputText}
          returnKeyType="next"
          type="text"
          placeholder="Usuário"
          label='Usuário:' />
        <Field
          validate={[required]}
          name="password"
          component={inputText}
          returnKeyType="send"
          type="password"
          placeholder="Senha"
          label='Senha:' />
        <Button onClick={handleSubmit}>
          { submitting ? 
          <ClipLoader
            sizeUnit={"px"}
            size={15}
            color={'#ffffff'}
          /> : <Text>Entrar</Text> }
        </Button>
        {
          auth.error &&
          <Error>{auth.error}</Error>
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

LoginForm = connect(mapStateToProps)(LoginForm)

export default reduxForm({
  form: 'loginForm'
})(LoginForm)