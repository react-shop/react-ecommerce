import React from 'react'
import Content from './containers/content'
import HeaderAdmin from './components/header'
import Infos from './components/infos'
import Sidebar from './components/sidebar'
import Configs from './components/configs'

const Admin = () => ( 
  <Content>
    <HeaderAdmin>
      <h1>Admin</h1>
    </HeaderAdmin>
    <Infos>
      <Sidebar />
      <Configs />
    </Infos>
  </Content>
)

export default Admin