import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import qs from 'qs';

import Product from './Product.js';
import {wishlistGetIds} from '../actions/index';

const mapStateToProps = state => {
    return {
      wishlistProducts: state.user.wishlistProducts
    };
  },
  mapDispatchToProps = dispatch => {
    return {
      wishlistGetIds: () => dispatch(wishlistGetIds())
    };
  }
;

class WishList extends Component {
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
    this.props.wishlistGetIds();
  }

  render() {
    return (
      <div className="wishlist-products">
        <h3>WishList</h3>
        <ul className="wishlist-products-list">
          {this.props.wishlistProducts && this.props.wishlistProducts.map((data) => <li className="featured-product-line" key={`product-line-${data._id}`}>
            <Product data={data} actionText={"Remove from wishlist"} actionJob="remove"
              actionPlaceholder="- wishlist"
              removeProduct={this.removeProduct} mode="simple" /></li>
          )}
        </ul>
      </div>
    )
  }

  updateData(ids) {
    console.log('OLD update data. keeped for remove action until we implement it with redux!');
    // const serverUrl = this.props.serverUrl;
    //   Axios.get(`${serverUrl}users/${this.props.userId}`).then(res => {
    //     const userWishlist = res.data.wishlist;
    //
    //     if(!Array.isArray(userWishlist) || userWishlist.length === 0) {
    //       this.setState({ products: [] });
    //       return;
    //     }
    //     Axios.get(`${serverUrl}products/`,
    //       {
    //         'params': { 'ids': userWishlist },
    //         'paramsSerializer': params => qs.stringify(params, { arrayFormat: 'repeat' })
    //       }).then(result => {
    //         this.setState({ products: result.data });
    //       })
    //   })
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

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
