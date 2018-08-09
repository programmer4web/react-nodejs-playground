import React from 'react';
import FeaturedProducts from './FeaturedProducts.js';
import WishList from './WishList.js';

const formatName = user => `${user.firstName} ${user.lastName}`,
  user = {
    firstName: 'John',
    lastName: 'Doe',
  },
  serverUrl = 'http://127.0.0.1:7070/';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.wishlistUpdateData = this.wishlistUpdateData.bind(this);
  }

  wishlistUpdateData(ids) {
    this.refs.wishlist1.updateData(ids);
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
              <FeaturedProducts callback={this.wishlistUpdateData}/>
            </div>
          </div>
          <div className="box">
            <div className="module">
              <WishList ref="wishlist1" serverUrl={serverUrl} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
