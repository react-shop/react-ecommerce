import React, {FunctionComponent, ReactChildren} from 'react';
import styled from 'styled-components';

const ContainerBtn = styled.div`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: red;
  color: #fff;
`;

export interface IDefaultButton {
  children: ReactChildren;
}

export const DefaultButton: FunctionComponent<IDefaultButton> = ({
  children,
}) => {
  return <ContainerBtn>{children}</ContainerBtn>;
};
