import React, { Component, Fragment, useState } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {logout} from "../../store/auth/thunks"
import {filterProducts} from "../../store/products/thunks"
import { showCart } from '../../store/cart/thunks'
import NavBar from "./styled-components/navbar"
import InfoBar from './styled-components/header/navbar/infoBar'
import NavLink from "./styled-components/nav-link"
import UserName from './styled-components/header/navbar/userName'
import UserMenu from './styled-components/userMenu'
import Search from './styled-components/searchForm.js'
import IconUser from './styled-components/iconUser'
import {
  filter as _filter
} from 'lodash'
import IconCart from './styled-components/iconWithBadge'
import LoginBtn from './styled-components/header/navbar/btn'

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

  const Right = styled.nav`
    flex: 1;
    text-align: right;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  `;
    return (
      <div>
        <NavBar {...props.auth}>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/post'>About Us</NavLink>
          <NavLink to='/post'>Products</NavLink>
          <NavLink to='/post'>Support</NavLink>
          <Right>
            {
              props.auth.logged ?
              <Fragment>
                <UserName><i className="fa fa-caret-down"></i>{props.auth.user.name}</UserName>
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
              <Fragment>
                <LoginBtn border="true" to='/login'>Login</LoginBtn>
                <LoginBtn bg="true" color="true" to='/register'>Register</LoginBtn>
              </Fragment>
              }
          </Right>
        </NavBar>
        <InfoBar>
          <h1>Logo</h1>
          <Search onSubmit={handleSubmit} />
          <IconCart 
            icon="star" bg="primary" 
            color="white" margin="12px" 
            badgeContent={props.cart.length} 
            onClick={() => props.showCart(true)}
          />
          <IconCart 
            icon="shopping-cart" bg="primary" 
            color="white" margin="12px" 
            badgeContent={props.cart.length} 
            onClick={() => props.showCart(true)}
          />
        </InfoBar>
      </div>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products,
  cart: state.cart
});

export default connect(mapStateToProps, {
  logout,
  filterProducts,
  showCart
})(Header)