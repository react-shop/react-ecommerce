import React from 'react'
import styled from 'styled-components'
import CardList from './sidebar/cardList'
import CardItem from './sidebar/cardItem'
import CardItemText from './sidebar/cardItemText'

const DashboardSidebar = styled.div`
  padding: 15px 10px;
  flex: 1;
  max-width: 25%;
`;

const Sidebar = () => (
  <DashboardSidebar>
    <CardList>
      <CardItem>
        <i className="fa fa-home" />
        <CardItemText>Dashboard</CardItemText>
      </CardItem>
      <CardItem>
        <i className="fa fa-shopping-bag" />
        <CardItemText>Anúncios</CardItemText>
      </CardItem>
      <CardItem>
        <i className="fa fa-envelope" />
        <CardItemText>Mensagens</CardItemText>
      </CardItem>
      <CardItem>
        <i className="fa fa-user" />
        <CardItemText>Editar perfil</CardItemText>
      </CardItem>
      <CardItem>
        <i className="fa fa-chart-bar" />
        <CardItemText>Resumo</CardItemText>  
      </CardItem>
      <CardItem>
        <i className="fa fa-question-circle" />
        <CardItemText>Ajuda</CardItemText>
      </CardItem>
    </CardList>
  </DashboardSidebar>
)

export default Sidebar