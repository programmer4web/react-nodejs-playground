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
        <img src={this.props.icon} alt={"warning"} width={40} height={40}/>
        <div className="notification-title">{this.props.title}</div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Notification);

Notification.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string
}
