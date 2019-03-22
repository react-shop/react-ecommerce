import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Loading from '../../layout/styled-components/spinner'
import { detailProduct } from '../../../store/products/thunks'
import { addCart } from '../../../store/cart/thunks'
import Title from './components/title'
import HeaderProduct from './components/headerProduct'
import ContentProduct from './components/contentProduct'
import InfosProduct from './components/infos/infosProduct'
import Gallery from './components/gallery/gallery'
import NextImages from './components/gallery/nextImages'
import SpotlightImage from './components/gallery/spotlightImage'
import Image from './components/gallery/image'
import ImagesGallery from './components/gallery/imagesGallery'
import Button from '../../layout/styled-components/button.js'

class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      moveToCart: ''
    }
  }

  componentDidMount() {
    const { match, detailProduct, auth } = this.props
    detailProduct(match.params.id)
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
  
  render() {
    const { products, cart } = this.props
    return (
    <div>
      <Loading show={products.loading} />
      <HeaderProduct>
        <span>Back</span>
        <div>Products > T-Shirts </div>
        {console.log('carrinho', cart)}
      </HeaderProduct>
      {
        products.product && 
          <ContentProduct className={this.state.moveToCart}>
            <Gallery>
              <NextImages>
                <ImagesGallery src="https://images.bewakoof.com/original/wink-new-half-sleeve-t-shirt-men-s-printed-t-shirts-197747-1538829534.jpg" />
                <ImagesGallery src="https://images.bewakoof.com/original/wink-new-half-sleeve-t-shirt-men-s-printed-t-shirts-197747-1538829534.jpg" />
                <ImagesGallery src="https://images.bewakoof.com/original/wink-new-half-sleeve-t-shirt-men-s-printed-t-shirts-197747-1538829534.jpg" />
              </NextImages>
              <SpotlightImage>
                <Image src="https://images.bewakoof.com/original/wink-new-half-sleeve-t-shirt-men-s-printed-t-shirts-197747-1538829534.jpg" alt={products.product.item} />
              </SpotlightImage>
            </Gallery>
            <InfosProduct>
              <Title>{products.product.item}</Title>
              <h2>Price: ${products.product.price}</h2>
              <span>Sku:{products.product.sku}</span>
              <Button onClick={() => this.handleAddCart(products.product)}>Add to Cart</Button>
            </InfosProduct>
          </ContentProduct>
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products,
  cart: state.cart
});

export default connect(mapStateToProps, {
  detailProduct,
  addCart
})(Product)