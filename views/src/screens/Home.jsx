import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import FeaturedProducts from '../components/FeaturedProducts.js';
import Profile from '../components/Profile.jsx';
import WishList from '../components/WishList.js';
import {MyTabs, MyTabsHeader} from '../components/Tabs.js';

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

    this.mytabsSelectedChanged = this.mytabsSelectedChanged.bind(this);
  }

  wishlistUpdateData(ids) {
    this.refs.wishlist.updateData(ids);
  }

  // my tabs selected changed managed from outside of tabs
  mytabsSelectedChanged(idx) {
    this.refs.myTabs.selectedChanged(idx);
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
            <Tab>Profile</Tab>
            <Tab>Tabs component</Tab>
          </TabList>
          <TabPanel>
            <div className="row">
              <div className="box">
                <div className="module">
                  <FeaturedProducts serverUrl={serverUrl} callback={this.wishlistUpdateData}/>
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
            <h2>Profile</h2>
            <Profile />
          </TabPanel>
          <TabPanel>

            <MyTabs ref="myTabs">
              <MyTabsHeader selectedChanged={this.mytabsSelectedChanged} >
                <div dataId="tab1">Tab 1</div>
                <div dataId="tab2">Tab 2</div>
                <div dataId="tab3">Tab 3</div>
              </MyTabsHeader>
              <div>Content of tab 1</div>
              <div>Content of tab 2</div>
              <div>Content of tab 3</div>
            </MyTabs>

          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
export default Home;
