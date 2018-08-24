import React, {Component} from 'react';
import {connect} from 'react-connect';
import PropTypes from 'prop-types';

import Notification from './Notification';

const mapStateToProps = state => {
  return {
    items: state.notifications.items
  }
}

class Notifications extends Component {
  render() {
    const items = this.props.items;
    return (
      <div className="notifications">
        {items && items.map(item => <Notification key={item._id} title={item.title} />)}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Notifications);

Notifications.propTypes = {
  items: PropTypes.array
}
