import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Autocomplete from './Autocomplete.jsx';
import {
  departmentsSearch,
  departmentsFocus,
  departmentsBlur,
  departmentsSelectedChanged
} from '../actions/DepartmentsActions.js';

const mapStateToProps = state => {
    const departments = state.departments;
    return {
      value: departments.search,
      items: departments.items,
      suggestionsVisible: departments.suggestionsVisible 
    }
  },
  mapDispatchToProps = dispatch => {
    return {
      searchChanged: search => dispatch(departmentsSearch(search)),
      selectedChanged: id => dispatch(departmentsSelectedChanged(id)),
      handleFocus: () => dispatch(departmentsFocus()),
      handleBlur: () => dispatch(departmentsBlur())
    }
  }

class DepartmentsAutocomplete extends Component {
  render() {
    const props = this.props,
      items = props.items,
      names = items.map(item => item.name),

      selectedChanged = idx => {
        props.selectedChanged(items[idx]);
      }
    return (
      <Autocomplete placeholder="Search Departments..."
        className="departments-autocomplete"
        value={props.value}
        items={names}
        suggestionsVisible={props.suggestionsVisible}
        searchChanged={props.searchChanged}
        selectedChanged={selectedChanged}
        handleFocus={props.handleFocus}
        handleBlur={props.handleBlur}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsAutocomplete);

DepartmentsAutocomplete.propTypes = {
  value: PropTypes.string,
  items: PropTypes.array,
  suggestionsVisible: PropTypes.bool,
  selectedChanged: PropTypes.func,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func
 
}