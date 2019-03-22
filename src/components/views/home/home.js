import React from 'react'
import { connect } from 'react-redux'
import Loading from '../../layout/styled-components/spinner'
import { requestHighlights } from '../../../store/products/thunks'
import { addCart } from '../../../store/cart/thunks'
import Content from './containers/content'
import Filter from './components/filter'
import Grid from './components/grid'
import ProductList from './components/productList'
import Sidebar from './components/sidebar'
import Button from '../../layout/styled-components/button'
import Title from '../../layout/styled-components/title'


class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openSidebar: false
		}
		this.handleSidebar = this.handleSidebar.bind(this)
	}
	componentDidMount() {
		const { requestHighlights } = this.props
		requestHighlights();
	}
	
	handleAddCart = async (product) => {
    this.setState({
      moveToCart: 'animated zoomOutRight delay-0.5s'
    });
    setInterval(
      () => this.setState({
        moveToCart: ''
      }),
      1000
    );
    return await this.props.addCart(product);
  };

	handleSidebar() {
		if(!this.state.openSidebar) {
			this.setState({
				openSidebar: true
			})
		} else {
			this.setState({
				openSidebar: false
			})
		}
	}
	render() {
		const { products } = this.props
		return (
			<Content>
				<Loading show={products.loading} />
				<Sidebar open={this.state.openSidebar} />
				<Grid>
					{/*<Filter>
						<i className="fa fa-filter" onClick={this.handleSidebar} />
					</Filter>*/}
					<ProductList {...this.props} onClick={this.handleAddCart} />
				</Grid>
				{/* <Button red>Colors!</Button>
				<Button green>Colors!</Button>
				<Button>Colors!</Button>
				<Button yellow>Colors!</Button> */}
			</Content>
		)
	}
}

const mapStateToProps = (state) => ({
    products: state.products
});

export default connect(mapStateToProps, {
  requestHighlights,
  addCart
})(Home)