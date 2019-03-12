import React from 'react';
import styled from 'styled-components';
import colors from './colors'

const Nav = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;    
    background: ${props => props.bg ? props.bg : '#e6e6e6'};
    position: ${props => props.fixed ? 'fixed' : 'relative'};
`;

const Right = styled.nav`
    flex: 1;
    text-align: right;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
`;

const Title = styled.h1`
    margin: 0;
    color: #000;
    font-weight: 600;
`;

const NavBar = (props) => (
    <Nav bg={props.bg}>
        <Title>{props.title || ''}</Title>
        <Right>
            {props.children}
        </Right>
    </Nav>
);

export default NavBar;