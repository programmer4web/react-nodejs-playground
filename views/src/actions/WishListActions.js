import Axios from 'axios';

export const wishlistAddProductAction = (productId, url) => {

  Axios.get(url).then(response => {
    const userWishlist = response.data.wishlist,
      idx = userWishlist.indexOf(productId);

    if (idx === -1) {
      userWishlist.push(productId);
      Axios.put(url, { wishlist: userWishlist }).then(res => {
        console.log('wishlist from backend:', res.data.wishlist);
        // this.updateData(res.wishlist);

        return res.data.wishlist;
      });
    } else {
      console.warn('product is already in wishlist.');
    }
  });
}
