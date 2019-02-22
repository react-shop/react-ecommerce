import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  flex: 1;
  min-width: 20%;
  background-color: #1D6F93;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
`;


const Sidebar = (props) => {
  return props.open && (
    <Content>
      <ul>
        <li>Categoria 1</li>
        <li>Categoria 2</li>
      </ul>
    </Content>
  )
}

export default Sidebar