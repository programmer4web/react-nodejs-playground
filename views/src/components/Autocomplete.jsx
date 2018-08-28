import React, {Component} from 'react';
import Select from 'react-list-select';
import PropTypes from 'prop-types';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChanged = this.handleSearchChanged.bind(this);
  }

  handleSearchChanged(e) {
    this.props.searchChanged(e.target.value);
  }

  render() {
    const props = this.props,
      items = props.items,
    className = props.className || 'autocomplete',
    suggestionsClassName = props.suggestionsVisible ? '': 'hidden';
    return (
      <div className={className}>
        <input type="text"
          placeholder={props.placeholder}
          className={`${className}-input`}
          value={props.value}
          onChange={this.handleSearchChanged}
        />
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
  selectedChanged: PropTypes.func
}
