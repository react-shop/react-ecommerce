import React from 'react'
import styled from 'styled-components'
import colors from '../colors'

const Input = styled.input`
	flex: 1;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background: white;
  border: none;
  color: #555;
  width: 300px;
  font-size: 13px;
  padding: 0 0 0 5px;
  &:focus {
    border: 2px solid #1D6F93;
  }
  ::placeholder {
    color: #e6e6e6;
    font-size: 12px;
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