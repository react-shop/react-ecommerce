import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { login } from '../../../store/auth/thunks'
import Form from './containers/loginForm'
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
            <div>
                <Title>You need to be logged to see the route: {from.pathname}</Title>
                <Form onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    login
})(Login)