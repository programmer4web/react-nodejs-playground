import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import FeaturedProducts from '../components/FeaturedProducts.js';
import Profile from '../components/Profile.jsx';
import WishList from '../components/WishList.js';
import {ContentTabs, ContentTabsHeader} from '../components/ContentTabs.js';
import Menu from '../components/Menu.js';
import Footer from '../components/Footer.js';

const formatName = user => `${user.firstName} ${user.lastName}`,
  user = {
    _id: '5b646febeebb915ff8b221be',
    firstName: 'John',
    lastName: 'Doe',
  },
  serverUrl = 'http://127.0.0.1:7070/';

const links = [
  {title: 'Featured Products', url: '/'},
  {title: 'Departments', url: '/departments'}
]

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.contentTabsSelectedChanged = this.contentTabsSelectedChanged.bind(this);
  }

  // my tabs selected changed managed from outside of tabs
  contentTabsSelectedChanged(idx) {
    this.contentTabs.selectedChanged(idx);
  }

  render() {
    return (
      <div>
      <div className="content container">
        <Menu links={links} className="main-menu" />
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
                  <FeaturedProducts />
                </div>
              </div>
              <div className="box">
                <div className="module">
                  <WishList />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Profile</h2>
            <Profile serverUrl={serverUrl} user={user}/>
          </TabPanel>
          <TabPanel>

            <ContentTabs ref={ref => (this.contentTabs = ref)}>
              <ContentTabsHeader selectedChanged={this.contentTabsSelectedChanged} >
                <div dataId="tab1">Tab 1</div>
                <div dataId="tab2">Tab 2</div>
                <div dataId="tab3">Tab 3</div>
              </ContentTabsHeader>
              <div>Content of tab 1</div>
              <div>Content of tab 2</div>
              <div>Content of tab 3</div>
            </ContentTabs>

          </TabPanel>
        </Tabs>
      </div>
      <Footer links={links} />
    </div>
    );
  }
}
export default Home;
