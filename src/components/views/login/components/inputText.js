import React from 'react'
import styled from 'styled-components'

const InputContent = styled.div`
  width: 200px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  padding: 5px;
`;

const Label = styled.label`
  text-align: left;
  padding-bottom: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #8D8C8C;
`;

const Input = styled.input`
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  padding: 5px;
  &:focus {
    border: 2px solid #1D6F93;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 13px;
`;

const inputText = ({
  input,
  label,
  type,
  classname,
  meta: { touched, error }
}) => (
  <InputContent>
    <Label>{label}</Label>
    <div>
      <Input {...input} placeholder={label} type={type} className={classname} />
      {touched &&
        (error && <Error>{error}</Error>)
      }
    </div>
  </InputContent>
)

export default inputText