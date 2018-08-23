import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Menu from './Menu.js';

const mapStateToProps = state => {
  return {
    links: state.links,
    user: state.user
  }
}

class Header extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="main-header">
        <Menu links={this.props.links} className="main-menu" />
        <div className="main-header-user">
          <h5>Hello, {user.name.first} {user.name.last}!</h5>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  user: PropTypes.object,
  links: PropTypes.array
}
