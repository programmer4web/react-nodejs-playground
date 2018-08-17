import Axios from 'axios';
import qs from 'qs';

export const wishlistAddProductApiCall = (productId, url) => {
  return new Promise((resolve, reject) => {
    Axios.get(url).then(response => {
      const userWishlist = response.data.wishlist,
        idx = userWishlist.indexOf(productId);

      if (idx === -1) {
        userWishlist.push(productId);
        Axios.put(url, { wishlist: userWishlist }).then(res => {
          // console.log('wishlist from backend:', res.data.wishlist);
          resolve(res.data.wishlist);
        });
      } else {
        console.warn('product is already in wishlist.');
        resolve(response.data.wishlist);
      }
    });
  });
}

export const wishlistGetProductsApiCall = (userWishlist, url) => {
  return new Promise((resolve, reject) => {
    // console.log('wishlistGetProducts: ', userWishlist);
    if(!Array.isArray(userWishlist) || userWishlist.length === 0) {
      resolve([]);
    }
    Axios.get(url,
      {
        'params': { 'ids': userWishlist },
        'paramsSerializer': params => qs.stringify(params, { arrayFormat: 'repeat' })
      }).then(result => {
        resolve(result.data);
      })
  });
}
