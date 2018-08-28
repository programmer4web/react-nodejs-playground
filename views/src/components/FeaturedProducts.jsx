import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {wishlistAddProduct} from '../actions/WishlistActions.js';
import {
  featuredProductsGetSource,
  featuredProductsHandleMode,
  featuredProductsApplyFilter
} from '../actions/FeaturedProductsActions.js';
import Product from './Product.jsx';
import CustomButton from './CustomButton.jsx';

const mapStateToProps = state => {
    return {
      serverUrl: state.serverUrl,
      source: state.featuredProducts.source,
      products: state.featuredProducts.visible,
      mode: state.featuredProducts.mode,
      filters: state.featuredProducts.filters
    }
  },
  mapDispatchToProps = dispatch => {
    return {
      wishlistAddProduct: productId => dispatch(wishlistAddProduct(productId)),
      featuredProductsGetSource: () => dispatch(featuredProductsGetSource()),
      featuredProductsHandleMode: mode => dispatch(featuredProductsHandleMode(mode)),
      featuredProductsApplyFilter: (task, value, filters, source) => dispatch(featuredProductsApplyFilter(task, value, filters, source))
    }
  }

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);

    this.handleMode = this.handleMode.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    this.props.featuredProductsGetSource();
  }

  handleMode() {
    const mode = this.props.mode == ''? 'simple': '';
    this.props.featuredProductsHandleMode(mode);
  }

  applyFilter(task, e) {
    this.props.featuredProductsApplyFilter(task, e.target.value, this.props.filters, this.props.source);
  }

  render() {
    const products = this.props.products;
    return (
      <div className="featured-products">
        <h3>Featured Products</h3>
        <div className="featured-products-actions">
          <CustomButton className="featured-product-mode action small" callback={this.handleMode}
            title="Change display mode of products" text={(this.props.mode == '') ? 'Simple' : 'Detailed'} />
          <select className="featured-products-sort" onChange={(e)=> this.applyFilter('sort', e)}>
            <option value="">No sorting</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <input className="featured-products-search" type="text" placeholder="Search products" onChange={(e) => this.applyFilter('search', e)} />
        </div>
        <ul className="featured-products-list">
          {(products && products.length > 0) ?
            products.map((data) => <li className="featured-product-line" key={`product-line-${data._id}`}>
              <Product data={data} mode={this.props.mode}
                actionText={"Add to wishlist"} callback={this.props.wishlistAddProduct} />
              </li>)
           :
            <div className="featured-products-empty">List is empty.</div>
          }
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);

FeaturedProducts.propTypes = {
  serverUrl: PropTypes.string,
  source: PropTypes.array,
  products: PropTypes.array,
  mode: PropTypes.string,
  filters: PropTypes.object,
  wishlistAddProduct: PropTypes.func,
  featuredProductsGetSource: PropTypes.func,
  featuredProductsHandleMode: PropTypes.func,
  featuredProductsApplyFilter: PropTypes.func
}
