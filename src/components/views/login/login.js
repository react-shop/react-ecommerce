import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { login } from '../../../store/auth/thunks'
import Form from './containers/loginForm'
import Content from './components/content'
import Button from '../../layout/styled-components/button'
import Title from '../../layout/styled-components/title'

class Login extends React.Component {
    
    handleSubmit = async ({username, password}) => {
        return await this.props.login({username, password});
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};

        if (this.props.auth.logged) {
            return <Redirect to={from}/>;
        }

        return (
            <Content>
                <Form onSubmit={this.handleSubmit} />
            </Content>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    login
})(Login)