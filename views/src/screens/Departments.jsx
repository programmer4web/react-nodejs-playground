import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import CustomButton from '../components/CustomButton.js';
import ProductsAutocomplete from '../components/ProductsAutocomplete.js';

const mapStateToProps = state => {
  return {
    serverUrl: state.serverUrl,
    user: state.user,
    links: state.links
  }
}

class Departments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      departmentProducts: []
    };

    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleRemoveOnClick = this.handleRemoveOnClick.bind(this);
    // this.handleProductChange=this.handleProductChange.bind(this);
    this.handleDepartmentAdd=this.handleDepartmentAdd.bind(this);
    this.getUnassignedProducts=this.getUnassignedProducts.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.props.serverUrl}departments`).then(result => {
      this.setState({ departments: result.data });
    });
    this.getUnassignedProducts();

  }
  getUnassignedProducts(){
  axios.get(`${this.props.serverUrl}products`).then(result => {
    const resultFiltered = result.data.filter(product =>  product.departments.length == 0 );
    this.setState({products: resultFiltered});
  })
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

  // handleProductChange(e) {
  //   const productId = e.target.value,
  //   product = this.state.products.filter((product) => productId==product._id)[0];
  //   this.setState({ product:product});
  // }

  handleDepartmentAdd(e, departmentId) {
    const product = this.state.product,
      departments = product.departments || [] ;

    departments.push(departmentId);
    console.log(product._id);
    axios.put(`${this.props.serverUrl}products/${product._id}`,{ departments}).then( result => {
      console.log(result.data);
      this.getUnassignedProducts();
    })
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
    const links = this.props.links;
    return (
      <div>
        <div className="content container">
          <Header/>
          <div className="row" style={{marginTop: 66}}>
            <div className="box">
              <div className="module">
                <div className="departments">
                  <h3>Products list</h3>
                  <ProductsAutocomplete/>
                  <hr />
                  <h3>Departments List</h3>
                  {this.state.departments.map(department => {
                    return (
                      <div key={department._id}>
                        <div>Department Name:{department.name}</div>
                        <div>Abbreviation: {department.abbreviation}</div>
                        <div>Description: {department.description}</div>
                        <CustomButton className="department-product-add" callback={e => this.handleDepartmentAdd(e, department._id)}
                          text="Add product in department" />
                        <hr />
                      </div>
                    )
                  }
                  )}
                </div>
              </div>
            </div>
            <div className="box">
              <div className="module">
                <div className="departments">
                  <h3>Products by Department</h3>
                  <select onChange={this.handleDepartmentChange}>
                    {this.state.departments.map(department => {
                      return <option key={`department-option-${department._id}`} value={department._id}>{department.name}</option>;
                    })
                    }
                  </select>
                  <ul className="department-products-list">
                    {this.state.departmentProducts && this.state.departmentProducts.map(product => (
                      <li className="departement-product-line" key={`product-line-${product._id}`}>
                        <div className="departement-products"><span className="department-product-name">{product.name}</span>
                          <CustomButton className="department-product-add" callback={e => this.handleRemoveOnClick(e, product)}
                            text="Remove from department" />
                        </div>
                      </li>))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer links={links} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Departments);

Departments.propTypes = {
  serverUrl: PropTypes.string,
  links: PropTypes.array
}
