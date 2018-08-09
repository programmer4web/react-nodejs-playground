import React, { Component, PropTypes } from 'react';
import Axios from 'axios';

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.handleClickAction = this.handleClickAction.bind(this);
  }
  render() {
    return <div className="action" onClick={this.handleClickAction}>{this.props.text}</div>
  }
  handleClickAction(e) {
    e.preventDefault();
    const props = this.props,
      productId = props.id,
      job = props.job,
      url = props.url;

    if (job == 'add') {
      this.props.addProduct(productId);
    } else if (job == 'delete') {
      this.props.removeProduct(productId);
    }
  }
}



// Action.propTypes = {
//   text: PropTypes.string
// }
