import React, {Component, PropTypes} from 'react';

export default class Action extends Component {
  render() {
    return <div className="action">{this.props.text}</div>
  }
}

// Action.propTypes = {
//   text: PropTypes.string
// }
