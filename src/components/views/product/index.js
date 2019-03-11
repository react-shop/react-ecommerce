import React from 'react'
import { connect } from 'react-redux'
import Loading from '../../layout/styled-components/spinner'
import { detailProduct } from '../../../store/products/thunks'
import Title from './components/title'

class Product extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { match, detailProduct, auth } = this.props
    detailProduct(auth.user.auth_token, match.params.id)
  }
  
  render() {
    const { products } = this.props
    return (
    <div>
      <Loading show={products.loading} />
      {
        products.product && 
          <div>
            <Title>{products.product.item}</Title>
            <h2>R${products.product.price}</h2>
            <span>Sku:{products.product.sku}</span>
          </div>
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products
});

export default connect(mapStateToProps, {
  detailProduct
})(Product)