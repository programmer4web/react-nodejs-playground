import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
      <div className="content container">
        <div className="row">
          <h2>Hello, {formatName(user)}!</h2>
        </div>
        <Tabs className="dashboard-tabs">
          <TabList>
            <Tab>Products</Tab>
            <Tab>Clients</Tab>
          </TabList>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
export default Home;
