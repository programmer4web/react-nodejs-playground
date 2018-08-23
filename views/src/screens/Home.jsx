import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FeaturedProducts from '../components/FeaturedProducts.js';
import Profile from '../components/Profile.jsx';
import WishList from '../components/WishList.js';
import {ContentTabs, ContentTabsHeader} from '../components/ContentTabs.js';
import Menu from '../components/Menu.js';
import Footer from '../components/Footer.js';

const mapStateToProps = state => {
  return {
    serverUrl: state.serverUrl,
    user: state.user,
    links: state.links
  }
}

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
    const props = this.props,
      links = props.links,
      user = props.user;
    return (
      <div>
      <div className="content container">
        <Menu links={links} className="main-menu" />
        <div className="row">
          <h2>Hello, {user.name}!</h2>
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
            <Profile serverUrl={this.props.serverUrl} user={this.props.user}/>
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
export default connect(mapStateToProps)(Home);

Home.propTypes = {
  serverUrl: PropTypes.string,
  user: PropTypes.object,
  links: PropTypes.array
}
