import React from 'react'
import styled from 'styled-components'
import Badge from './badge'

const Content = styled.div`
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  margin: ${props => props.margin};
  cursor: pointer;
`;

const Icon = styled.i`
  color: #555;
`;

const IconWithBadge = (props) => (
  <Content margin={props.margin} onClick={props.onClick}>
    <Icon className={'fa fa-' + props.icon} />
    <Badge bg={props.bg} color={props.color}>{props.badgeContent}</Badge>
  </Content>  
)

export default IconWithBadge
