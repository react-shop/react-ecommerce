import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  -webkit-transition: all .3s ease;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  border-radius: 3px;
  border: none;
  background-color: #1D6F93;
  box-shadow: 0 10px 12px rgba(0,0,0,0.2);
  padding: 10px 30px;
  margin: 10px 0;
  width: 100px;
  align-self: center;
  &:hover {
    background-color: #3682A3;
  }
`;

export default Button