import React from 'react';
import FeaturedProducts from './FeaturedProducts.js';
const formatName = user => `${user.firstName} ${user.lastName}`;

const user = {
  firstName: 'John',
  lastName: 'Doe'
};

const Home = () => (
  <div>
    <h2>Hello, {formatName(user)}!</h2>
    <div>
      <FeaturedProducts />
    </div>
    <div>
      <h3>to do Wishlist here</h3>
      {/*<WishList />*/}
    </div>
  </div>
)


export default Home;
