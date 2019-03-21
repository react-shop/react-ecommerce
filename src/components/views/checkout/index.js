import React from 'react'
import { connect } from 'react-redux'

const Checkout = (props) => {
	const { cart: { items } , auth: { user } } = props
	return (
		<div>
			<h1>Checkout</h1>
			<h2>Welcome {user.name}</h2>
			<div>
				<h3>Items in cart:</h3>
				{
					items ? items.map((i, key) => 
						<div key={key}>{i.item}</div>
					) : <span>Empty Cart</span>
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