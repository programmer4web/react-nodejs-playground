import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CustomButton from '../components/CustomButton.jsx';
import ProductsAutocomplete from '../components/ProductsAutocomplete.jsx';
import DepartmentsAutocomplete from '../components/DepartmentsAutocomplete.jsx';
import DepartmentAttributes from '../components/DepartmentAttributes.jsx';
import ProductsByDepartment from '../components/ProductsByDepartment.jsx';
import {departmentsProductAdd} from '../actions/DepartmentsProductsActions.js';

import { productsByDepartmentGetDepartments} from '../actions/ProductsByDepartmentActions.js';

const mapStateToProps = state => {
  return {
    serverUrl: state.serverUrl,
    user: state.user,
    links: state.links,
    product: state.departments.products.selected,
    departments: state.productsByDepartment.items
  }
},
mapDispatchToProps = dispatch => {
  return {
    getDepartments: () => dispatch(productsByDepartmentGetDepartments()),
    departmentsProductAdd: () => dispatch(departmentsProductAdd())
  }
}

class Departments extends Component {
  constructor(props) {
    super(props);

    this.getUnassignedProducts=this.getUnassignedProducts.bind(this);
  }

  componentDidMount() {
    this.props.getDepartments();
  }

  getUnassignedProducts() {
  axios.get(`${this.props.serverUrl}products`).then(result => {
    const resultFiltered = result.data.filter(product => product.departments.length == 0 );
    this.setState({products: resultFiltered});
  })
}

  render() {
    const links = this.props.links;
    return (
      <div>
        <div className="content container">
          <Header/>
          <div className="row" style={{marginTop: 66}}>
            <div className="box">
              <div className="module">
                <div className="departments">
                  <h3>Add Product in Department</h3>
                  <div><ProductsAutocomplete/></div>
                  <div><DepartmentsAutocomplete/></div>
                  <CustomButton className="department-product-add" callback={this.props.departmentsProductAdd}
                    text="Add product in department" />
                  <hr />
                  <h3>Departments List</h3>
                  {this.props.departments.map(department => 
                    <DepartmentAttributes department={department} key={department._id}/>
                  )}
                </div>
              </div>
            </div>
            <div className="box">
              <div className="module">
                <ProductsByDepartment />
              </div>
            </div>
          </div>
        </div>
        <Footer links={links} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Departments);

Departments.propTypes = {
  serverUrl: PropTypes.string,
  links: PropTypes.array,
  product: PropTypes.object,
  departments: PropTypes.array,
  departmentsProductAdd: PropTypes.func,
  getDepartments: PropTypes.func
}
