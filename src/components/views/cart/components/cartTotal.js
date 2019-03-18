import React from 'react'
import styled from 'styled-components'
import colors from '../../../layout/styled-components/colors'
import { Link } from 'react-router-dom'

const Content = styled.div`
	background-color: rgba(0,0,0,0.1);
	height: 60px;
	width: 100%;
	padding: 10px;
	display: flex;
	flex-flow: column;
`;

const Price = styled.div`
	flex: 1;
	flex-basis: 80%;
`;

const Quantity = styled.div`
	flex: 1;
	border-left: 1px solid #000;
	padding: 0 10px;
	text-align: right;
`;

const Cart = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

const Actions = styled.div`
	margin-top: 10px;
	display: flex;
	flex-flow: row wrap;
`;

const Button = styled(Link)`
	flex: 1;
  margin: 0 5px;
  background-color: ${props => props.bg ? props.bg : colors.primary};
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  text-decoration: none;
  color: #000;
  text-align: center;
  &:hover {
  	background-color: ${colors.dark};
  }
`;

const CartTotal = (props) => (
	<Content>
		<Cart>
			<Price>{props.total}</Price>
			<Quantity>{props.quantity}</Quantity>
		</Cart>
		<Actions>
			<Button bg='#e6e6e6' to="#" onClick={props.cancel}>Cancel</Button>
			<Button to="/checkout" onClick={props.checkout} >Checkout</Button>
		</Actions>
	</Content>
)

export default CartTotal