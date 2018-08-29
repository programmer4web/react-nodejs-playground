import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DepartmentAttributes extends Component {
  
  render() {
    const department = this.props.department;
    return (
      <div key={department._id}>
        <div className="department-attribute">
          <span>Name:</span> {department.name}
        </div>
        <div className="department-attribute">
          <span>Abbreviation:</span> {department.abbreviation}
        </div>
        <div className="department-attribute">
          <span>Description:</span> {department.description}
        </div>
        <hr />
      </div>
    )
  }
}

export default DepartmentAttributes;

DepartmentAttributes.propTypes = {
  department: PropTypes.object
}