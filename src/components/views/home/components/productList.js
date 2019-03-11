import React from 'react'
import styled from 'styled-components'
import Card from './productCard'

const List = styled.div`
  flex: 1;
  min-width: 80%;
  color: #fff;
  display: flex;
  flex-flow: row wrap;
`;


const ProductList = (props) => {
  const { list } = props

  return (
    <List>
    {
      console.log('lista de prod', list)
    }
      {
        list && list.map((p, index) => 
          <Card key={index} link={p.id} item={p.item} price={p.price} color={p.color} image={p.image} />
        )
      }
    </List>
  )
}

export default ProductList