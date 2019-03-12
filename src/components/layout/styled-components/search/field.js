import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
	flex: 1;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background: rgba(255,255,255,0.7);
  border: none;
  color: #000;
  width: 100px;
  padding: 5px;
  &:focus {
    border: 2px solid #1D6F93;
  }
`;

const inputText = ({
  input,
  label,
  type,
  classname,
  placeholder
}) => (
  <Input {...input} placeholder={placeholder} type={type} className={classname} />
)

export default inputText