import React from 'react'
import { connect } from 'react-redux'
import Content from './containers/content'
import HeaderAdmin from './components/header'
import Infos from './components/infos'
import Sidebar from './components/sidebar'
import Configs from './components/configs'

const Admin = (props) => (
  <Content>
    <HeaderAdmin {...props.auth}>
      <h1>Admin</h1>
    </HeaderAdmin>
    <Infos {...props.products}>
      <Sidebar />
      <Configs />
    </Infos>
  </Content>
)

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products
})

export default connect(mapStateToProps)(Admin)