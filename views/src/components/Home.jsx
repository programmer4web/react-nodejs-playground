import React from 'react';
import FeaturedProducts from './FeaturedProducts.js';
import WishList from './WishList.js';

const formatName = user => `${user.firstName} ${user.lastName}`,
  user = {
    firstName: 'John',
    lastName: 'Doe'
  },
  serverUrl = 'http://127.0.0.1:7070/';

const Home = () => (
  <div className="content">
    <div className="row">
      <h2>Hello, {formatName(user)}!</h2>
    </div>
    <div className="row">
      <div className="box">
        <div className="module">
          <FeaturedProducts />
        </div>
      </div>
      <div className="box">
        <div className="module">
          <WishList serverUrl={serverUrl} />
        </div>
      </div>
    </div>
  </div>
)


export default Home;
