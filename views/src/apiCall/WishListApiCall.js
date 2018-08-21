import axios from 'axios';
import qs from 'qs';

export const wishlistGetIdsApiCall = url => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      resolve(response.data.wishlist);
    }).catch(err => {
      console.warn(err);
      reject();
    });
  });
}

export const wishlistAddProductApiCall = (productId, url) => {
  return new Promise((resolve, reject) => {
    wishlistGetIdsApiCall(url).then(wishlist => {
      const idx = wishlist.indexOf(productId);

      if (idx === -1) {
        wishlist.push(productId);
        axios.put(url, { wishlist: wishlist }).then(res => {
          resolve(res.data.wishlist);
        });
      } else {
        reject('product is already in wishlist.');
      }
    }).catch(err => {
      console.warn(err);
      reject();
    });
  });
}

export const wishlistRemoveProductApiCall = (productId, url) => {
  return new Promise((resolve, reject) => {
    wishlistGetIdsApiCall(url).then(wishlist => {
      const idx = wishlist.indexOf(productId);
      wishlist.splice(idx, 1);

      axios.put(url, { wishlist: wishlist }).then(res => {
        resolve(res.data.wishlist);
      }).catch(err => {
        console.warn(err);
        reject();
      });
    })
  });
}

export const wishlistGetProductsApiCall = (userWishlist, url) => {
  return new Promise((resolve, reject) => {
    if(!Array.isArray(userWishlist) || userWishlist.length === 0) {
      resolve([]);
    }
    axios.get(url, {
      'params': { 'ids': userWishlist },
      'paramsSerializer': params => qs.stringify(params, { arrayFormat: 'repeat' })
    }).then(result => {
      resolve(result.data);
    }).catch(err => {
      console.warn(err);
      reject();
    });
  });
}
