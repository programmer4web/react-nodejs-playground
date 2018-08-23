import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu.js';

class Footer extends Component {

  render() {
    const version = '0.0.7',
      links = this.props.links;
    return (
      <footer className="footer">
        <div className="container">
          {links && <Menu links={links} className="footer-menu"/>}
          <span className="app-version">v. {version}</span>
        </div>
      </footer>
    )
  }
}

export default Footer;

Footer.propTypes = {
  links: PropTypes.array
}
