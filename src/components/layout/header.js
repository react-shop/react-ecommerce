import React, { Component, Fragment, useState } from 'react'
import {connect} from 'react-redux'
import {logout} from "../../store/auth/thunks"
import {filterProducts} from "../../store/products/thunks"
import NavBar from "./styled-components/navbar"
import NavLink from "./styled-components/nav-link"
import UserMenu from './styled-components/userMenu'
import Search from './styled-components/searchForm.js'
import IconUser from './styled-components/iconUser'
import {
  filter as _filter
} from 'lodash'

const Header = (props) => {
    const [openUserMenu, setUserMenu] = useState(false)

    const handleOpenMenu = () => {
        setUserMenu(openUserMenu === false ? true : false)
    }

    const handleSubmit = async ({term}) => {
      // criar thunk para filtrar por qualquer termo
      const filtered = _filter(props.products.list, (i) => 
      i.item.indexOf(term)>-1
    )
    return await props.filterProducts(filtered)
  }

    return (
        <NavBar title='E-commerce' bg='#B0DBEE'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/post'>Contato</NavLink>
            <Search onSubmit={handleSubmit} />
            {
                props.auth.logged ?
                    <Fragment>
                        <IconUser className="fa fa-user" onClick={() => handleOpenMenu()}/>
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
  auth: state.auth,
  products: state.products
});

export default connect(mapStateToProps, {
  logout,
  filterProducts
})(Header)