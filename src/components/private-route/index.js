import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, auth: auth, ...rest}) => (
    <Route {...rest}
       render={props => (
           auth.logged ?
               <Component {...props} />
           :
               <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
       )}
    />
);

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)