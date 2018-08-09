import React, { Component } from 'react';
import Axios from 'axios';
import qs from 'qs';

import Product from './Product.js';

export default class WishList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userWishlist: [],
      products: []
    }

    this.updateData = this.updateData.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    return (
      <div className="wishlist-products">
        <h3>WishList</h3>
        <ul className="wishlist-products-list">
          {this.state.products.map((data) => <li className="featured-product-line" key={`product-line-${data._id}`}>
            <Product data={data} actionText={"Remove from wishlist"} actionJob={"delete"}
              removeProduct={this.removeProduct} /></li>
          )}
        </ul>
      </div>
    )
  }

  updateData(ids) {
    const serverUrl = this.props.serverUrl;
      Axios.get(`${serverUrl}users/${this.props.userId}`).then(res => {
        const userWishlist = res.data.wishlist;

        if(!Array.isArray(userWishlist) || userWishlist.length === 0) {
          this.setState({ products: [] });
          return;
        }
        Axios.get(`${serverUrl}products/`,
          {
            'params': { 'ids': userWishlist },
            'paramsSerializer': params => qs.stringify(params, { arrayFormat: 'repeat' })
          }).then(result => {
            this.setState({ products: result.data });
          })
      })
  }

  addProduct(productId) {
    const url = `${this.props.serverUrl}users/${this.props.userId}`; // get user data url

    Axios.get(url).then(response => {
      const userWishlist = response.data.wishlist,
        idx = userWishlist.indexOf(productId);

      if (idx === -1) {
        userWishlist.push(productId);
        Axios.put(url, { wishlist: userWishlist }).then(res => {
          this.updateData(res.wishlist);
        });
      } else {
        console.warn('product is already in wishlist.');
      }
    });
  }

  removeProduct(productId) {
    const url = `${this.props.serverUrl}users/${this.props.userId}`; // get user data url

    Axios.get(url).then(response => {
      let userWishlist = response.data.wishlist;
      const idx = userWishlist.indexOf(productId);
      userWishlist.splice(idx, 1);

      // update wishlist
      Axios.put(url, { wishlist: userWishlist }).then(res => {
        // handle empty wishlist, avoid showing all products that api returns
        if(Array.isArray(userWishlist) && userWishlist.length > 0) {
          this.updateData(res.wishlist);
        } else {
          this.updateData();
        }
      });
    });
  }
}
