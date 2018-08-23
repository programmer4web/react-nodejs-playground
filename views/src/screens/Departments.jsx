import React, { Component } from 'react';
import axios from 'axios';


const serverUrl = 'http://127.0.0.1:7070/';

export default class Departments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      departmentProducts: []
    };

    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleRemoveOnClick = this.handleRemoveOnClick.bind(this);
    this.handleProductChange=this.handleProductChange.bind(this);
    this.handleDepartmentAdd=this.handleDepartmentAdd.bind(this);
    this.getUnassignedProducts=this.getUnassignedProducts.bind(this);
  }

  componentDidMount() {
    axios.get(`${serverUrl}departments`).then(result => {
      this.setState({ departments: result.data });
    });
    this.getUnassignedProducts();
    
  }
  getUnassignedProducts(){
  axios.get(`${serverUrl}products`).then(result => {
    const resultFiltered = result.data.filter(product =>  product.departments.length == 0 );
    this.setState({products: resultFiltered});
  })
}

  handleDepartmentChange(e) {
    const departmentId = e.target.value;
    console.log('new department: ', departmentId);
    if (!departmentId) {
      console.warn('Department id is undefined.');
      return;
    }
    axios.get(`${serverUrl}products?departments=${departmentId}`).then(result => {
      console.log(result.data);
      this.setState({ departmentId: departmentId });
      this.setState({ departmentProducts: result.data });
    });
  }

  handleProductChange(e){
    const productId = e.target.value,
    product = this.state.products.filter((product) => productId==product._id)[0];
    this.setState({ product:product});

  }

  handleDepartmentAdd(departmentId){
    const product = this.state.product;
    const departments = product.departments || [] ;

    departments.push(departmentId);
    console.log(product._id);
    axios.put(`${serverUrl}products/${product._id}`,{ departments}).then( result => {
      console.log(result.data);
      this.getUnassignedProducts();
      
    })

    
  }

  handleRemoveOnClick(product) {
    const departments = product.departments;
    console.log(departments);
    const idx = departments.indexOf(this.state.departmentId);
    departments.splice(idx, 1);

    axios.put(`${serverUrl}products/${product._id}`, { departments }).then(result => {
      console.log(result.data);
      const idx2 = this.state.departmentProducts.indexOf(product);
      const temp = this.state.departmentProducts;
      temp.splice(idx2, 1);
      this.setState({ departmentProducts: temp });
      this.getUnassignedProducts();
    })

  }
  render() {
    return (
      <div className="row">
        <div className="box">
          <div className="module">
            <h3>Products list</h3>
            <select onChange={this.handleProductChange}>
              <option>
                  Select value
              </option>
              {this.state.products && this.state.products.map(product => {
                return <option key={`product-option-${product._id}`} value={product._id}>{product.name}</option>;
              })
              }
            </select>
            <hr />
            <h3>Departments List</h3>
            {this.state.departments.map(department => {
              return (
                <div key={department._id}>
                  <div>Department Name:{department.name}</div>
                  <div>Abbreviation: {department.abbreviation}</div>
                  <div>Description: {department.description}</div>
                  <div className="action department-product-add" onClick={() => this.handleDepartmentAdd(department._id)}  >
                    Add product in department
                    </div>
                  <hr />
                </div>
              )
            }
            )}
          </div>
        </div>
        <div className="box">
          <div className="module">

            <h3>Products by Department</h3>
            <select onChange={this.handleDepartmentChange}>
              {this.state.departments.map(department => {
                return <option key={`department-option-${department._id}`} value={department._id}>{department.name}</option>;
              })
              }
            </select>
            <ul className="department-products-list">
              {this.state.departmentProducts && this.state.departmentProducts.map(((product) => (
                <li className="departement-product-line" key={`product-line-${product._id}`}>
                  <div className="departement-products"><span className="department-product-name">{product.name}</span>
                    <div className="action department-product-add" data-id={product._id} onClick={() => this.handleRemoveOnClick(product)}>
                      Remove from department
                    </div>
                  </div>
                </li>)))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
