import React, {Component} from 'react';
import axios from 'axios';

export default class Departments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      products: []
    };

    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.props.serverUrl}departments`).then(result => {
      this.setState({departments: result.data});
    });
  }

  handleDepartmentChange(e) {
    const departmentId = e.target.value;
    console.log('new department: ', departmentId);
    if(!departmentId) {
      console.warn('Department id is undefined.');
      return;
    }
    axios.get(`${this.props.serverUrl}products`, {
      "params":{"department": departmentId}}).then(result => {
        console.log(result.data);
        this.setState({products: result.data});
      });
  }

  render() {
    return(
      <div className="row">
        <div className="box">
          <div className="module">
            <h3>Departments List</h3>
            {this.state.departments.map(department => {
              return (
                <div key={department._id}>
                  <div>Department Name:{department.name}</div>
                  <div>Abbreviation: {department.abbreviation}</div>
                  <div>Description: {department.description}</div>
                  <hr/>
                </div>
              )}
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
          </div>
        </div>
      </div>
    );
  }
}
