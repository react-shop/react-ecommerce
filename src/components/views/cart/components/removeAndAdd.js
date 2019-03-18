import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
	border: none;
	background-color: rgba(255,255,255,0.3);
	cursor: pointer;
  border-radius: 3px;
  margin: 0 3px;
`;

const RemoveAndAdd = (props) => (
	<Button onClick={props.onClick}>{props.text}</Button>
)

export default RemoveAndAdd