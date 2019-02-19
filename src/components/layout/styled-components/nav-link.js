import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const NavLink = styled(Link)`
    color: #555;
    text-decoration: none;
    text-transform: none;
    text-align: center;
    padding: 12px;
    &:hover, &:active, &:visited, &:link{
      color: #555;
      text-decoration: none;
      text-transform: none;
    }
    &:hover {
      color: #000;
    }
`;

export default NavLink;