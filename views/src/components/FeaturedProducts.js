import React, { Component } from 'react';
import axios from 'axios';

import Product from './Product.js';

export default class FeaturedProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [], // before any search
      visibleProducts: [],
      productsMode: ''
    }

    this.handleMode = this.handleMode.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.props.serverUrl}products`).then(res => {
      const products = res.data || [];
      this.setState({ products, visibleProducts: products });
    })
  }

  handleMode(e) {
    this.setState({ productsMode: (this.state.productsMode === '') ? 'simple' : '' });
  }

  handleSearch(e) {
    e.preventDefault();
    const value = e.target.value,
      visibleProducts = this.state.products.filter(
        product => product.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    this.setState({visibleProducts});
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
          <select className="featured-products-sort">
            <option value="">No sorting</option>
            <option value="asc">Ascending</option>
            <option value="asc">Descending</option>
          </select>
          <input className="featured-product-search" type="text" placeholder="Search products" onChange={this.handleSearch} />
        </div>
        <ul className="featured-products-list">
          {(visibleProducts && visibleProducts.length > 0) ?
            this.state.visibleProducts.map((data) => <li className="featured-product-line" key={`product-line-${data._id}`}>
              <Product data={data} mode={this.state.productsMode}
                actionText={"Add to wishlist"} actionJob={"add"} addProduct={this.props.wishlistAddProduct}/>
              </li>)
           :
            <div className="featured-products-empty">List is empty.</div>
          }
        </ul>
      </div>
    );
  }
}
