import React from 'react';
import styled from 'styled-components';
const ContainerBtn = styled.div `
  padding: 10px 15px;
  border-radius: 5px;
  background-color: red;
  color: #fff;
`;
export const DefaultButton = ({ children, }) => React.createElement(ContainerBtn, null, children);
