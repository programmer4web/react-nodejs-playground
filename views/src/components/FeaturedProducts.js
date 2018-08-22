import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {connect} from 'react-redux';

import {wishlistAddProduct} from '../actions/index';
import Product from './Product.js';

const mapStateToProps = state => {
    return {
      serverUrl: state.serverUrl
    }
  },
  mapDispatchToProps = dispatch => {
    return {
      wishlistAddProduct: productId => dispatch(wishlistAddProduct(productId))
    }
  }



class FeaturedProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [], // before any search
      visibleProducts: [],
      productsMode: ''
    };

    this.filters = {
      sort: '',
      search: ''
    };
    this.handleMode = this.handleMode.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.props.serverUrl}products`).then(res => {
      const products = res.data || [];
      this.setState({ products, visibleProducts: products });
    })
  }

  handleMode() {
    this.setState({ productsMode: (this.state.productsMode === '') ? 'simple' : '' });
  }

  applyFilter(task, e) {
    e.preventDefault();
    const value = e.target.value;

    this.filters = Object.assign({}, this.filters, {[task]: value});
    this.filterUpdated(task, value);

  }

  filterUpdated() {
    const filters = this.filters,
      searchText = filters.search;
    let visibleProducts = this.state.products;

    if(searchText !== '') {
      visibleProducts = visibleProducts.filter(
        prod => prod.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
    }

    const sort = filters.sort;
    if(sort !== '') {
      visibleProducts = this.sortProductsByName(visibleProducts, sort);
    }
    this.setState({visibleProducts});
  }

  // Sort Products by Name and keep products with the same name in the original order
  sortProductsByName(products, sort) {
    let indexed = products.map((product, idx) => {
      return { product: product, idx: idx }
    });

    indexed.sort((a, b) => {
      const nameA = a.product.name.toLowerCase(),
        nameB = b.product.name.toLowerCase();

      if(sort == 'asc') {
        if(nameA < nameB) return -1;
        if(nameA > nameB) return 1;
        return a.idx - b.idx;
      } else {
        if(nameA < nameB) return 1;
        if(nameA > nameB) return -1;
        return b.idx - a.idx;
      }
    });
    return indexed.map((item => item.product));
  }

  render() {
    const visibleProducts = this.state.visibleProducts;
    return (
      <div className="featured-products">
        <h3>Featured Products</h3>
        <div className="featured-products-actions">
          <div className="featured-product-mode action small" onClick={this.handleMode} title="Change display mode of products">
            {(this.state.productsMode == '') ? 'Simple' : 'Detailed'}
          </div>
          <select className="featured-products-sort" onChange={(e)=> this.applyFilter('sort', e)}>
            <option value="">No sorting</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <input className="featured-products-search" type="text" placeholder="Search products" onChange={(e) => this.applyFilter('search', e)} />
        </div>
        <ul className="featured-products-list">
          {(visibleProducts && visibleProducts.length > 0) ?
            this.state.visibleProducts.map((data) => <li className="featured-product-line" key={`product-line-${data._id}`}>
              <Product data={data} mode={this.state.productsMode}
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
  wishlistAddProduct: PropTypes.func
}
