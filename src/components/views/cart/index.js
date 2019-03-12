import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { removeCart, showCart } from '../../../store/cart/thunks'
import Drawer from '@material-ui/core/Drawer';

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
			{
				props.cart.list &&
					props.cart.list.map((p, key) => 
						<div key={key}>
							<div>{p.item}</div>
							<span onClick={() => props.removeCart(key)}>remove</span>
						</div>
					)
				}
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