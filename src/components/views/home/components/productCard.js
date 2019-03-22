import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const CardContent = styled.div`
  flex: 1;
  height: 460px;
  margin: 15px 15px;
  background-color: transparent;
  position: relative;
  display: flex;
  flex-flow: column;
`;

const TopCard = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`;

const CenterCard = styled.div`
  display: flex;
  flex-flow: row wrap;

`;
const TitleCard = styled.h1`
  font-size: 18px;
  color: #d8d8d8;
  padding: 5px 8px 5px 5px;
  text-align: right;
  flex: 1;
`;

const Category = styled.div`
  width: 108px;
  height: 44px;
  background: linear-gradient(180deg, #BB6BD9 0%, #8E7EFB 100%);
  border-top-right-radius: 22px;
  border-bottom-right-radius: 22px;
  padding: 14px;
`;

const Gallery = styled.div`
  display: flex;
  flex-flow: column;
  width: 120px;
  padding: 35px 0;
  max-width: 10%;
  flex: 1;
`;

const GalleryImages = styled.div`
  -webkit-clip-path: polygon(0 40%, 100% 0%, 100% 60%, 0% 100%);
  clip-path: polygon(0 40%, 100% 0%, 100% 60%, 0% 100%);
  background-color: #000;
  height: 100px;
  width: 100px;
  margin: -15px 0;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: auto;
`;

const PriceCard = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  display: flex;
  flex-flow: row;
`;

const ShareProduct = styled.span`
  background-color: #9ED49E;
  flex: 1;
  padding: 8px 10px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  font-size: 16px;
  color: white;
`;

const InfosProduct = styled.div`
  max-width: 50%;
  flex: 1;
`;

const DetailProduct = styled.span`
  background-color: #68C08F;
  color: #fff;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  padding: 9px 10px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 400px;
`;

const ImageContainer = styled.div`
  width: 300px;
  height: auto;
  max-width: 40%;
  flex: 1;
`;

const Icon = styled.i`
  margin-left: 5px;
  cursor: pointer;
`;

const CardLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  background: linear-gradient(180deg, #8676FB 0%, #AB7BFF 100%);
  border-radius: 15px;
  font-size: 12px;
  padding: 10px 15px;
  text-transform: uppercase;
`;

const Card = (props) => (
  <CardContent>
    <TopCard color={props.color}>
      <Category>Shoes</Category>
      <TitleCard>
        {(props.index+1) + '/' + props.quantity}
      </TitleCard>
    </TopCard>
    <CenterCard>
      <Gallery>
        <GalleryImages>
          <GalleryImage src={props.image} />
        </GalleryImages>
        <GalleryImages>
          <GalleryImage src={props.image} />
        </GalleryImages>
        <GalleryImages>
          <GalleryImage src={props.image} />
        </GalleryImages>
        <GalleryImages>
          <GalleryImage src={props.image} />
        </GalleryImages>
      </Gallery>
      <ImageContainer>
        <Image src={props.image} />
      </ImageContainer>
      <InfosProduct>
        {props.item}
        <span>{'R$' + props.price}</span>
        <PriceCard>
          <CardLink to='#' onClick={props.onClick}>
            Add to Cart
          </CardLink>
        </PriceCard>
      </InfosProduct>
    </CenterCard>
  </CardContent>
)

export default Card;