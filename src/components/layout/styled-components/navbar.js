import React from 'react';
import styled from 'styled-components';
import colors from './colors'

const Nav = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 50px;    
    background: ${props => props.bg ? props.bg : colors.header};
    position: ${props => props.fixed ? 'fixed' : 'relative'};
`;

const Title = styled.h1`
    margin: 0;
    color: #000;
    font-weight: 600;
`;

const NavBar = (props) => (
    <Nav bg={props.bg}>
        {props.children}
    </Nav>
);

export default NavBar;