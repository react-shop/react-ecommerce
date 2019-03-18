import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
	width: 100%;
	border-radius: 50%;
`;

const ContentDescription = styled.div`
	flex: 1;
	max-width: 70%;
	display: flex;
  flex-flow: column;
  padding-top: 15px;
`;

const Actions = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	padding: 15px 5px 0 0;
`;

const Price = styled.span`
	font-size: 16px;
	flex: 1;
`;

const CartItemDescription = (props) => (
	<ContentDescription>
		<Title>{props.item}</Title>
		<Actions>
			<Price>{'R$' + props.price}</Price>
			{props.children}
		</Actions>

	</ContentDescription>
)


export default CartItemDescription