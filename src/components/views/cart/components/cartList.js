import React from 'react'
import styled from 'styled-components'

const CartList = styled.ul`
	width: 100%;
	display: flex;
	flex-flow: column;
  height: calc(100vh - 96px);
  overflow-x: auto;
	::-webkit-scrollbar {
	  width: 8px;
	}
	::-webkit-scrollbar-track {
	  background: #f1f1f1; 
	}
	::-webkit-scrollbar-thumb {
	  background: #888; 
	}
	::-webkit-scrollbar-thumb:hover {
	  background: #555; 
	}
`;

export default CartList