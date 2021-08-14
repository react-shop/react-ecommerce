import { GetServerSideProps } from 'next';

import { ROUTES } from '@config/routes';

const Index = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: ROUTES.PRIVATE.ROOT(),
      permanent: false,
    },
  };
};

export default Index;
