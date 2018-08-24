import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {notificationReaded} from '../actions/NotificationActions.js';


const mapDispatchToProps = dispatch => {
  return {
    notificationReaded: id => dispatch(notificationReaded(id))
  }
}

class Notification extends Component {
  render() {
    return (
      <div className="notification">
        {this.props.title}
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Notification);

Notification.propTypes = {
  title: PropTypes.string
}
