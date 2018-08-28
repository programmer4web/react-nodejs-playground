import axios from 'axios';

export const departmentsProductAddApiCall = (url, departments, departmentId) => {
  return new Promise((resolve, reject) => {
    
    const department = departments.find(dep => dep._id == departmentId);
    if (!department || department.length == 0) {
      departments.push(departmentId);
    }
    axios.put(url, {departments: departments}).then(response => {
      resolve(response.data);
    }).catch(err => {
      console.warn(err);
      reject();
    });
  });
}
