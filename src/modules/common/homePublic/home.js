import React from 'react';

import Banner from './banner';
import Showcase from './showcase';
import Tech from './tech';
import Footer from './footer';

const Home = () => {
  const _render = (
    <div>
      <Banner />
      <Showcase />
      <Tech />
      <Footer />
    </div>
  );
  return (
    _render
  );
};

export default Home;
