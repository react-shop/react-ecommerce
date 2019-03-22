import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import colors from '../../colors'

const LoginLink = styled(Link)`
  color: ${props => props.color ? colors.white : '#BC9CFF'};
  background: ${props => props.bg ? colors.gradient : 'transparent'};
  border: ${props => props.border ? '1px solid #BC9CFF' : 'none'};
  text-decoration: none;
  text-transform: none;
  text-align: center;
  padding: 12px;
  font-size: 12px;
  margin: 0 5px;
  border-radius: 5px;
  &:hover {
    background: rgb(134,118,251);
    color: white;
    background: linear-gradient(87deg, rgba(134,118,251,1) 0%, rgba(171,123,255,1) 100%);
    border: none;
  }
`;

export default LoginLink;