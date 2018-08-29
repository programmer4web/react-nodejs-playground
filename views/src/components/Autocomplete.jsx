import React, {Component} from 'react';
import Select from 'react-list-select';
import PropTypes from 'prop-types';

import CustomButton from './CustomButton.jsx';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChanged = this.handleSearchChanged.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSearchChanged(e) {
    this.props.searchChanged(e.target.value);
  }

  handleBlur() {
    window.setTimeout(this.props.handleBlur, 100);
  }

  handleClear() {
    this.props.searchChanged('');
    this.props.handleBlur();
  }

  render() {
    const props = this.props,
      items = props.items,
    className = props.className || 'autocomplete',
    suggestionsClassName = props.suggestionsVisible ? '': 'hidden';

    let inputClassName = `${className}-input`; 
    if(props.value && (!items || items.length == 0)) { // search but empty suggestions
      inputClassName = `empty-items ${inputClassName}`;
    }
    return (
      <div className={className}>
        <input type="text"
          placeholder={props.placeholder}
          className={inputClassName}
          value={props.value}
          onChange={this.handleSearchChanged}
          onFocus={props.handleFocus}
          onBlur={this.handleBlur}
        />
        <CustomButton text="X" title="Clear"
          callback={this.handleClear}
          className="custom-button-clear"/>
        <div className={`${className}-suggestions ${suggestionsClassName}`}>
          <Select onChange={props.selectedChanged} items={items}/>
        </div>
      </div>
    );
  }
}

export default Autocomplete;

Autocomplete.propTypes = {
  value: PropTypes.string,
  items: PropTypes.array,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  searchChanged: PropTypes.func,
  selectedChanged: PropTypes.func,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func
}
