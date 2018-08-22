import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const title = this.props.title,
     icon = this.props.icon;
    let className = 'action ';
    if(this.props.className) {
      className += this.props.className;
    }
    return <div className={className} title={title} onClick={this.handleClick}>
      {icon ? <img src={icon} alt={title} width={30} height={30} />: this.props.text}
    </div>
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
  title: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  callback: PropTypes.func
}
