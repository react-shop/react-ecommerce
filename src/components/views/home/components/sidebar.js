import React from 'react'
import styled from 'styled-components'
import CategoryForm from '../containers/categoryForm'

const Content = styled.div`
  flex: 1;
  max-width: 40%;
  background-color: #1D6F93;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  color: white;
  padding: 15px;
  display: flex;
  flex-flow: column;
`;

const Sidebar = (props) => {
  return props.open && (
    <Content>
      <h2>Filter categories</h2>
      <CategoryForm />
    </Content>
  )
}

export default Sidebar