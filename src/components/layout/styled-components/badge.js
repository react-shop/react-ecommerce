import React from 'react'
import styled from 'styled-components'
import colors from './colors'

const Badge = styled.span`
	top: 0;
  right: 0;
  height: 15px;
  display: flex;
  padding: 0 4px;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  font-size: 0.70rem;
  min-width: 15px;
  transform: scale(1) translate(50%, -50%);
  box-sizing: border-box;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  align-content: center;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  transform-origin: 100% 0%;
  background: ${props => props ? colors[props.bg] : colors.default};
  color: ${props => props ? colors[props.color] : colors.white};
`;

export default Badge
