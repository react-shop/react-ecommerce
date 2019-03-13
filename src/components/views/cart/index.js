import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { removeCart, showCart } from '../../../store/cart/thunks'
import Drawer from '@material-ui/core/Drawer';
import CartList from './components/cartList'
import CartItem from './components/cartItem'

const Content = styled.div`
  background-color: #e6e6e6;
`;

const Cart = (props) => (
	<Drawer anchor="right" open={props.cart.show} onClose={() => props.showCart(false)}>
		<div
      tabIndex={0}
      role="button"
      onKeyDown={() => props.showCart(false)}
    >
      <Content>
			Carrinho
			<CartList>
				{
					props.cart.items &&
						props.cart.items.map((p, key) => 
							<CartItem key={key}>
								<div>{p.item}</div>
								<button onClick={() => props.removeCart(p.sku)}>remove</button>
								<span>{p.quantity} x</span>
							</CartItem>
						)
				}
			</CartList>
			</Content>
    </div>
	</Drawer>
)

const mapStateToProps = (state) => ({
	cart: state.cart
})

export default connect(mapStateToProps,{
	removeCart,
	showCart
})(Cart)