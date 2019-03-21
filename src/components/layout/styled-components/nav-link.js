import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const NavLink = styled(Link)`
    color: #555;
    text-decoration: none;
    text-transform: none;
    text-align: center;
    padding: 12px;
    font-size: 12px;
    &:hover, &:active, &:visited, &:link{
      color: #555;
      text-decoration: none;
      text-transform: none;
    }

    &:hover {
      font-size: 13px;
      font-weight: bold;
      color: white;
      transition: ease 1s;
      background-color: white;
      color: #555;
      border-radius: 30px;
    }
`;

export default NavLink;