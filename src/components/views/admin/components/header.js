import React from 'react'
import { connect } from 'react-redux'
import Content from './header/content'
import Profile from './header/profile'
import Avatar from './header/avatar'
import Welcome from './header/welcome'
import dateFormat from 'dateformat'

const Header = (props) => (
  <Content>
    <Profile>
      <Avatar src='https://png.pngtree.com/svg/20160307/52c66f1f8b.png' />
      <h1>{props.auth.user.name}</h1>
      <span>Member since: {dateFormat(props.auth.user.created_at,'dd/mm/yyyy')}</span>
    </Profile>
    <Welcome>
      Welcome!
    </Welcome>
  </Content>
)

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Header)