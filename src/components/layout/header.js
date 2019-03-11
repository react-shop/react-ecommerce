import React, { Component, Fragment, useState } from 'react'
import {connect} from 'react-redux'
import {logout} from "../../store/auth/thunks"
import NavBar from "./styled-components/navbar";
import NavLink from "./styled-components/nav-link";
import UserMenu from './styled-components/userMenu'

const Header = (props) => {
    const [openUserMenu, setUserMenu] = useState(false)

    const handleOpenMenu = () => {
        setUserMenu(openUserMenu === false ? true : false)
    }

    return (
        <NavBar title='TestSite' bg='#B0DBEE'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/post'>Contato</NavLink>
            {
                props.auth.logged ?
                    <Fragment>
                        <i className="fa fa-user" onClick={() => handleOpenMenu()}/>
                        {
                          openUserMenu &&
                            <UserMenu>
                              {props.auth.user.access === '1' ? 
                                  <NavLink to='/admin' onClick={() => setUserMenu(false)}>Admin</NavLink> : 
                                  <NavLink to='/profile' onClick={() => setUserMenu(false)}>Profile</NavLink>
                              }
                              <NavLink to='/' onClick={props.logout}>Logout</NavLink>
                            </UserMenu>
                        }
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