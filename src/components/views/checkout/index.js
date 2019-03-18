import React from 'react'
import { connect } from 'react-redux'

const Checkout = (props) => {
	const { cart: { items } , auth: { user } } = props
	return (
		<div>
			<h1>Checkout</h1>
			<h2>Bem vindo {user.name}</h2>
			<div>
				<h3>Items in cart:</h3>
				{
					items.map((i, key) => 
						<div key={key}>{i.item}</div>
					)
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	cart: state.cart
})

export default connect(mapStateToProps)(Checkout)