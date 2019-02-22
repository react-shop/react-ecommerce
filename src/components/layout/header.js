import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {logout} from "../../store/auth/thunks"
import NavBar from "./styled-components/navbar";
import NavLink from "./styled-components/nav-link";

const Header = (props) => {
    return (
        <NavBar title='TestSite' >
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/post'>Contato</NavLink>
            {
                props.auth.logged ?
                    <Fragment>
                        <NavLink to='/admin'>Admin</NavLink>
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