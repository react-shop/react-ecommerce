import React, { useEffect, useState } from 'react';
import { Grid, DefaultButton, Header } from '@react-shop/design-system';
import { ProductProvider } from '@react-shop/sdk';

const items = [{
  text: 'Link 1',
}, {
  text: 'Link 2',
}];

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
    <Grid>
      <Header buttonItems={items} />
      <DefaultButton onClick={() => setText('Button update')}>
        {text}
      </DefaultButton>
    </Grid>
  );
};

export default Home;
