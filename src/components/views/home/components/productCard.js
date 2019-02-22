import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const CardContent = styled.div`
  flex: 1;
  height: 150px;
  min-width: 300px;
  max-width: 300px;
  margin: 15px 15px;
  border-radius: 3px;
  box-shadow: 0px 10px 12px rgba(0,0,0,0.2);
  background-color: #fff;
  position: relative;
`;

const TopCard = styled.div`
  width: 45%;
  height: 100%;
  -webkit-clip-path: polygon(0 0, 100% 0%, 40% 100%, 0% 100%);
  clip-path: polygon(0 0, 100% 0%, 40% 100%, 0% 100%);
  background-color: ${props => props.color};
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const TitleCard = styled.h1`
  font-size: 14px;
  color: #d8d8d8;
  padding: 5px 8px 5px 5px;
`;

const PriceCard = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  position: absolute;
  bottom: -10px;
  right: -15px;
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
  width: 150px;
  height: auto;
  position: absolute;
  top: -3px;
  right: 100px;
`;

const Icon = styled.i`
  margin-left: 5px;
  cursor: pointer;
`;

const Card = (props) => (
  <CardContent>
    <TopCard color={props.color}>
      <TitleCard>
        {props.item}
      </TitleCard>
    </TopCard>
    <Image src={props.image} />
    <PriceCard>
      <ShareProduct>
        <Icon className="fa fa-share" />
        <Link to={'/product/' + props.link}>
          <Icon className="fa fa-info-circle" />
        </Link>
      </ShareProduct>
      <DetailProduct>
        {'R$' + props.price}
      </DetailProduct>
    </PriceCard>
  </CardContent>
)

export default Card;