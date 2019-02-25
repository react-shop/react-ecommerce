import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {logout} from "../../store/auth/thunks"
import NavBar from "./styled-components/navbar";
import NavLink from "./styled-components/nav-link";

const Header = (props) => {
    return (
        <NavBar title='TestSite' bg='#B0DBEE'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/post'>Contato</NavLink>
            {
                props.auth.logged ?
                    <Fragment>
                        {props.auth.user.access === '1' ? 
                            <NavLink to='/admin'>Admin</NavLink> : 
                            <NavLink to='/profile'>Profile</NavLink>
                        }
                        <NavLink to='/' onClick={props.logout}>Logout</NavLink>
                    </Fragment>
                    :
                    <NavLink to='/login'>Login</NavLink>
            }
        </NavBar>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(Header)