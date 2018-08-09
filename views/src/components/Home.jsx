import React from 'react';
import FeaturedProducts from './FeaturedProducts.js';
import WishList from './WishList.js';

const formatName = user => `${user.firstName} ${user.lastName}`,
  user = {
    _id: '5b646febeebb915ff8b221be',
    firstName: 'John',
    lastName: 'Doe',
  },
  serverUrl = 'http://127.0.0.1:7070/';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.wishlistUpdateData = this.wishlistUpdateData.bind(this);
    this.wishlistAddProduct = this.wishlistAddProduct.bind(this);
  }

  wishlistUpdateData(ids) {
    this.refs.wishlist.updateData(ids);
  }

  wishlistAddProduct(id) {
    this.refs.wishlist.addProduct(id);
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <h2>Hello, {formatName(user)}!</h2>
        </div>
        <div className="row">
          <div className="box">
            <div className="module">
              <FeaturedProducts serverUrl={serverUrl} wishlistAddProduct={this.wishlistAddProduct} callback={this.wishlistUpdateData}/>
            </div>
          </div>
          <div className="box">
            <div className="module">
              <WishList ref="wishlist" serverUrl={serverUrl} userId={user._id}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
