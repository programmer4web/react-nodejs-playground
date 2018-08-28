import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Autocomplete from './Autocomplete.jsx';
import {
  departmentsProductsSearch,
  departmentsProductsSelectedChanged 
} from '../actions/DepartmentsProductsActions.js';

const mapStateToProps = state => {
    const products = state.departments.products;
    return {
      value: products.search,
      items: products.items,
      suggestionsVisible: products.suggestionsVisible 
    }
  },
  mapDispatchToProps = dispatch => {
    return {
      searchChanged: search => dispatch(departmentsProductsSearch(search)),
      selectedChanged: id => dispatch(departmentsProductsSelectedChanged(id))
    }
  }

class ProductsAutocomplete extends Component {
  render() {
    const props = this.props,
      items = props.items,
      names = items.map(item => item.name),

      selectedChanged = idx => {
        props.selectedChanged(items[idx]);
      }
    return (
      <Autocomplete placeholder="Search Products..."
        className="products-autocomplete"
        value={props.value}
        items={names}
        suggestionsVisible={props.suggestionsVisible}
        searchChanged={props.searchChanged}
        selectedChanged={selectedChanged}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAutocomplete);

ProductsAutocomplete.propTypes = {
  value: PropTypes.string,
  items: PropTypes.array,
  suggestionsVisible: PropTypes.bool,
  _selectedChanged: PropTypes.func
}