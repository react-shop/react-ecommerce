import React from 'react'
import { connect } from 'react-redux'
import Loading from '../../layout/styled-components/spinner'
import { detailProduct } from '../../../store/products/thunks'

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
        products.list && 
          <div>
            <h1>{products.list.item}</h1>
            <h2>{products.list.price}</h2>
            <span>{products.list.sku}</span>
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