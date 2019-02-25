import React from 'react'
import styled from 'styled-components'
import colors from '../../../../layout/styled-components/colors'

const CardItem = styled.div`
  width: 90px;
  height: 90px;
  padding: 5px;
  margin: 5px 15px;
  border-radius: 3px;
  box-shadow: 0 10px 12px rgba(0,0,0,0.2);
  background-color: ${colors.white};
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    opacity: .7;
  };
`;

export default CardItem