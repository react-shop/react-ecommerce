import React from 'react'
import styled from 'styled-components'
import colors from '../../../../layout/styled-components/colors'

const CardItem = styled.div`
  width: 90px;
  height: 90px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  box-shadow: 0 10px 12px rgba(0,0,0,0.2);
  background-color: ${colors.lighteen};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  &:hover {
    ${colors.primary}
  };
`;

export default CardItem