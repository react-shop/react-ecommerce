import React from 'react'
import { connect } from 'react-redux'
import Button from '../../layout/styled-components/button'
import Title from '../../layout/styled-components/title'

const Home = (props) => (
    <div>
        <Title>Bem vindo {props.auth.user.name}</Title>
        <Button red>Colors!</Button>
        <Button green>Colors!</Button>
        <Button>Colors!</Button>
        <Button yellow>Colors!</Button>
    </div>
)

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home)