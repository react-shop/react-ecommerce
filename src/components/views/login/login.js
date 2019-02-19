import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { login } from '../../../store/auth/thunks'
import Button from '../../layout/styled-components/button'
import Title from '../../layout/styled-components/title'

const Login = (props) => {
    const {from} = props.location.state || {from: {pathname: "/"}};

    if (props.auth.logged) {
        return <Redirect to={from}/>;
    }

    return (
        <div>
            <Title>You need to be logged to see the route: {from.pathname}</Title>
            <Button upper onClick={props.login}>Log in</Button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    login
})(Login)