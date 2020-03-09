import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View``;

const Title = styled.Text``;

const App = ({ text }) => (
  <Container>
    <Title>{text}</Title>
  </Container>
);

export default App;
