import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <div className="action" onClick={this.handleClick}>{
      this.props.placeholder ?
      <span className="action-placeholder">{this.props.placeholder}</span> : this.props.text
    }</div>
  }

  handleClick(e) {
    e.preventDefault();
    this.props.callback(this.props.id);
  }
}

export default CustomButton;

CustomButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  callback: PropTypes.func
}
