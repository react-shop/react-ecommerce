import React, { useEffect, useState } from 'react';
import { Button, Container } from '@react-shop/design-system';
import { ProductProvider } from '@react-shop/sdk';

const Home = () => {
  const fetchProducts = async () => {
    const response = await ProductProvider.getProducts();

    console.log('response', response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [text, setText] = useState<string>('My Button');

  return (
    <Container>
      <Button onClick={() => setText('Button update')}>
        {text}
      </Button>
    </Container>
  );
};

export default Home;
