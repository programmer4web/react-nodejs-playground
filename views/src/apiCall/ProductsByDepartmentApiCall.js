import axios from 'axios';

export const productsByDepartmentGetDepartmentsApiCall = url => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      resolve(response.data);
    }).catch(err => {
      console.warn(err);
      reject();
    });
  });
}