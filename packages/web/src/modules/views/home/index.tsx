import React, { useEffect } from 'react';
import { Button, Container } from '@react-shop/design-system';
import { getProducts } from '@react-shop/sdk';

const Home = () => {
  const fetchProducts = async () => {
    const response = await getProducts();

    console.log('response', response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Button>
      My Button 1
      </Button>
    </Container>
  );
};

export default Home;
