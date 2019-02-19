import React from 'react'
import styled from 'styled-components'
import colors from "./colors";

const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 25px;
    color: ${props => colors[Object.keys(props).find(p => colors[p])] || colors.black};
`;

export default Title;