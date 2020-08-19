import React, { useEffect } from 'react';

import { SafeAreaView, View, Text } from 'react-native';

import { ProductProvider } from '@react-shop/sdk';

const Routes = () => {
  useEffect(() => {
    ProductProvider.getProducts();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Routes</Text>
      </View>
    </SafeAreaView>
  );
};

export default Routes;
