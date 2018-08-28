import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Product from './Product.jsx';
import Modal from './Modal.jsx';
import Notification from './Notification.jsx';

import { wishlistGetIds, wishlistRemoveProduct } from '../actions/WishlistActions.js';

const mapStateToProps = state => {
    return {
      wishlistProducts: state.user.wishlistProducts,
      wishlistError: state.user.wishlistError
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
                actionIcon="/imgs/wishlist-delete.svg" mode="simple" /></li>
          )}
        </ul>
        <Modal>
          <Notification icon={'/imgs/warning.svg'} title={this.props.wishlistError}/>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);

WishList.propTypes = {
  wishlistProducts: PropTypes.array,
  wishlistError: PropTypes.string,
  wishlistGetIds: PropTypes.func,
  wishlistAddProduct: PropTypes.func,
  wishlistRemoveProduct: PropTypes.func,
}
