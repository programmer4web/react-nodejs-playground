import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
  render() {
    const className = this.props.className || 'menu';
    return(
    <div className={className}>
      {this.props.links.map((link, idx) => {
        return (
          <div key={`${className}-item-${idx}`} className={`${className}-line`}>
            <a href={link.url} className={`${className}-link`}>{link.title}</a>
          </div>
        )
      })
    }
  </div>)
  }
}

export default Menu;

Menu.propTypes = {
  links: PropTypes.array,
  className: PropTypes.string
}
