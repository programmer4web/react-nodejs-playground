import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const title = this.props.title,
      text = this.props.text,
     icon = this.props.icon;
    let className = 'custom-button ';
    if(this.props.className) {
      className += this.props.className;
    }
    return <div className={className} title={title} onClick={this.handleClick}>
      {icon ? <img src={icon} alt={text} title={text} width={20} height={20} />: text}
    </div>
  }

  handleClick(e, data) {
    e.preventDefault();
    this.props.callback(this.props.id, data);
  }
}

export default CustomButton;

CustomButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  callback: PropTypes.func
}
