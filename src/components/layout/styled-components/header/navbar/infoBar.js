import React from 'react'
import styled from 'styled-components'
import colors from '../../colors'

const InfoContent = styled.div`
	background-color: transparent;
	color: ${colors.white};
	padding: 10px 50px;
	display: flex;
	flex-flow: row wrap;
`;

const InfoBar = (props) => (
	<InfoContent>
		{props.children}
	</InfoContent>
)

export default InfoBar