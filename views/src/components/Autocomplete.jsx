import React, {Component} from 'react';
import Select from 'react-list-select';
import PropTypes from 'prop-types';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChanged = this.handleSearchChanged.bind(this);
  }

  handleSearchChanged (e){
    this.props.searchChanged(e.target.value);
  }

  render() {
    const props = this.props,
      items = props.items,
    className = props.className || 'autocomplete';
    return (
      <div className={className}>
        <input type="text"
          placeholder={props.placeholder}
          className={`${className}-input`}
          defaultValue={props.search}
          onChange={this.handleSearchChanged}
        />
        <Select onChange={props.selectedChanged} items={items}/>
      </div>
    );
  }
}

export default Autocomplete;

Autocomplete.propTypes = {
  search: PropTypes.string,
  items: PropTypes.array,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  searchChanged: PropTypes.func,
  selectedChanged: PropTypes.func
}
