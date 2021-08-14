import Head from 'next/head';

import HomeScreen from '@home/screens/Main';

export default function Page() {
  return (
    <>
      <Head>
        <title>Home - TC</title>
      </Head>
      <HomeScreen />
    </>
  );
}
