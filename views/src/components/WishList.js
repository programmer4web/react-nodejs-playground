import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Product from './Product.js';
import {wishlistGetIds, wishlistRemoveProduct} from '../actions/WishlistActions.js';

const mapStateToProps = state => {
    return {
      wishlistProducts: state.user.wishlistProducts
    };
  },
  mapDispatchToProps = dispatch => {
    return {
      wishlistGetIds: () => dispatch(wishlistGetIds()),
      wishlistRemoveProduct: productId => dispatch(wishlistRemoveProduct(productId))
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
              <Product data={data} actionText={"Remove from wishlist"} callback={this.props.wishlistRemoveProduct}
                actionPlaceholder="- wishlist" mode="simple" /></li>
          )}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);

WishList.propTypes = {
  wishlistProducts: PropTypes.array,
  wishlistGetIds: PropTypes.func,
  wishlistAddProduct: PropTypes.func,
  wishlistRemoveProduct: PropTypes.func,
}
