import React, { Component } from 'react';
import {connect} from 'react-redux';

import Product from './Product.js';
import {wishlistGetIds, wishlistRemoveProduct} from '../actions/index';

const mapStateToProps = state => {
    return {
      wishlistProducts: state.user.wishlistProducts
    };
  },
  mapDispatchToProps = dispatch => {
    return {
      wishlistGetIds: () => dispatch(wishlistGetIds()),
      removeProduct: productId => dispatch(wishlistRemoveProduct(productId))
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
  }

  componentDidMount() {
    this.props.wishlistGetIds();
  }

  render() {
    return (
      <div className="wishlist-products">
        <h3>WishList</h3>
        <ul className="wishlist-products-list">
          {this.props.wishlistProducts && this.props.wishlistProducts.map(
            (data) => <li className="featured-product-line" key={`product-line-${data._id}`}>
              <Product data={data} actionText={"Remove from wishlist"} actionJob="remove"
                actionPlaceholder="- wishlist" mode="simple" /></li>
          )}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
