import axios from 'axios';

export const featuredProductsGetSourceApiCall = url => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      resolve(response.data);
    }).catch(err => {
      console.warn(err);
      reject();
    });
  });
}
