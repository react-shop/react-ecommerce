import React from 'react'
import styled from 'styled-components'
import Card from './productCard'
import Slider from "react-slick";

const List = styled.div`
  flex: 1;
  min-width: 80%;
  color: #fff;
  display: flex;
  flex-flow: row wrap;
  height: 600px;
`;

const ReactSlider = styled(Slider)`
  margin: 10px auto;
  width: calc(100vw - 70px);
`;

const ProductList = (props) => {
  const { products } = props
  var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
  };
  return (
    <List>
    {
      console.log('9999999999999', props)
    }
      <ReactSlider {...settings} >
        {
          products.spotlights && products.spotlights.map((p, index) => 
            <div key={index}>
              <Card product={p} link={p.id} item={p.item} price={p.price} color={p.color} image={p.image} quantity={products.spotlights.length} index={index} onClick={() => props.onClick(p)}/>
            </div>
          )
        }
      </ReactSlider>
    </List>
  )
}

export default ProductList