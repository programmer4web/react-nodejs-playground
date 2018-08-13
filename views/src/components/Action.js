import React, { Component, PropTypes } from 'react';

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.handleClickAction = this.handleClickAction.bind(this);
  }

  render() {
    return <div className="action" onClick={this.handleClickAction}>{
      this.props.job == "remove" ?
      <span className="action-placeholder">{this.props.placeholder}</span> : this.props.text
    }</div>
  }

  handleClickAction(e) {
    e.preventDefault();
    const props = this.props,
      productId = props.id,
      job = props.job;

    if (job == 'add') {
      this.props.addProduct(productId);
    } else if (job == 'remove') {
      this.props.removeProduct(productId);
    }
  }
}



// Action.propTypes = {
//   text: PropTypes.string
// }
