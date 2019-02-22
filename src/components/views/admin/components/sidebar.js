import React from 'react'
import styled from 'styled-components'
import CardList from './sidebar/cardList'
import CardItem from './sidebar/cardItem'

const DashboardSidebar = styled.div`
  padding: 15px 10px;
  flex: 1;
  max-width: 30%;
`;

const Sidebar = () => (
  <DashboardSidebar>
    <CardList>
      <CardItem>
        Dashboard
        <i className="fa fa-home" />
      </CardItem>
      <CardItem>Criar Anúncio</CardItem>
      <CardItem>Anúncios</CardItem>
    </CardList>
  </DashboardSidebar>
)

export default Sidebar