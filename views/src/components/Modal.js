import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CustomButton from './CustomButton.js';
import {modalOpen, modalClose} from '../actions/ModalActions.js';

const mapStateToProps = state => {
  return {
    status: state.modal.status
  }
}
const mapDispatchToProps = dispatch => {
  return {
    modalOpen: () => dispatch(modalOpen()),
    modalClose: () => dispatch(modalClose())
  }
}

class Modal extends Component {
  constructor(props) {
    super(props);

    // create modal id and add to state to later identify for close/distroy
  }
  render() {
    const className = this.props.className,
      hidden = this.props.status == false? 'hidden': '';

    return (
      <div className={`modal ${className? className: ''} ${hidden}`}>
        <div className="modal-content">
            {this.props.children}
            <CustomButton text="Close" className="modal-content-close" callback={() => this.props.modalClose()} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

Modal.propTypes = {
  className: PropTypes.string,
  status: PropTypes.bool,
  children: PropTypes.object,
  modalClose: PropTypes.func
}
