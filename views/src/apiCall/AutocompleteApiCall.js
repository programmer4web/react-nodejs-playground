import axios from 'axios';

export const autocompleteSearchApiCall = (url, search) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {
        search: search
      }
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      console.warn(err);
      reject();
    });
  });
}
