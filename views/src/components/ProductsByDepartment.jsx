import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {connect} from 'react-redux';

import CustomButton from './CustomButton.jsx';

import {
  productsByDepartmentGetDepartments,
  productsByDepartmentRemove
} from '../actions/ProductsByDepartmentActions.js';

const mapStateToProps = state => {
  return {
    serverUrl: state.serverUrl,
    departments: state.productsByDepartment.items,
    selected: state.productsByDepartment.selected,
    departmentProducts: state.productsByDepartment.products
  }
},
  mapDispatchToProps = dispatch => {
    return {
      getDepartments:() => dispatch(productsByDepartmentGetDepartments()),
      productRemove: productId => dispatch(productsByDepartmentRemove(productId))
    }
  }


class ProductsByDepartment extends Component {
  constructor(props) {
    super(props);

    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleRemoveOnClick = this.handleRemoveOnClick.bind(this);
  }

  componentDidMount() {
    this.props.getDepartments();
  }

  handleDepartmentChange(e) {
    const departmentId = e.target.value;
    if (!departmentId) {
      console.warn('Department id is undefined.');
      return;
    }
    axios.get(`${this.props.serverUrl}products?departments=${departmentId}`).then(result => {
      this.setState({ departmentId: departmentId });
      this.setState({ departmentProducts: result.data });
    });
  }

  handleRemoveOnClick(e, product) {
    const departments = product.departments,
      idx = departments.indexOf(this.state.departmentId);
    departments.splice(idx, 1);

    axios.put(`${this.props.serverUrl}products/${product._id}`, { departments }).then(() => {
      const idx2 = this.state.departmentProducts.indexOf(product);
      const temp = this.state.departmentProducts;
      temp.splice(idx2, 1);
      this.setState({ departmentProducts: temp });
      this.getUnassignedProducts();
    })
  }

  render() {
    const departments = this.props.departments,
      departmentProducts = this.props.departmentProducts;

    return(
      <div className="departments">
        <h3>Products by Department</h3>
        <select onChange={this.handleDepartmentChange}>
          {departments.map(department => {
            return <option key={`department-option-${department._id}`} value={department._id}>{department.name}</option>;
          })
          }
        </select>
        <ul className="department-products-list">
          {departmentProducts && departmentProducts.map(product => (
            <li className="department-product-line" key={`product-line-${product._id}`}>
              <div className="department-products"><span className="department-product-name">{product.name}</span>
                <CustomButton className="department-product-add" callback={e => this.handleRemoveOnClick(e, product)}
                  text="Remove from department" />
              </div>
            </li>))}
        </ul>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsByDepartment);

ProductsByDepartment.propTypes = {
  serverUrl: PropTypes.string,
  products: PropTypes.array,
  departments: PropTypes.array,
  departmentProducts: PropTypes.array,
  getDepartments: PropTypes.func
}