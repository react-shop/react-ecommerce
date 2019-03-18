import React from 'react'
import styled from 'styled-components'

const CartItem = styled.li`
	display: flex;
	flex-flow: row wrap;
	background-color: rgba(0,0,0,0.2);
	border-bottom: 1px solid #000;
	padding: 15px 10px;
  min-height: 120px;
  &:first-child {
		border-top: 1px solid #000;
  }
`;

export default CartItem