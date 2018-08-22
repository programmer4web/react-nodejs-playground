import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Action extends Component {
  constructor(props) {
    super(props);
    this.handleClickAction = this.handleClickAction.bind(this);
  }

  render() {
    return <div className="action" onClick={this.handleClickAction}>{
      this.props.placeholder ?
      <span className="action-placeholder">{this.props.placeholder}</span> : this.props.text
    }</div>
  }

  handleClickAction(e) {
    e.preventDefault();
    this.props.callback(this.props.id);
  }
}

export default Action;

Action.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  callback: PropTypes.func
}
