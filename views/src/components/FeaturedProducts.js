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

  handleMode(e) {
    this.setState({ productsMode: (this.state.productsMode === '') ? 'simple' : '' });
  }

  applyFilter(task, e) {
    e.preventDefault();
    const value = e.target.value;

    if(task === 'search') {
      this.filters = Object.assign({}, this.filters, {search: value});
      this.filterUpdated(task, value);
    }
  }

  filterUpdated(task, value) {
    console.log('filterUpdated here.');
    const filters = this.filters;
    let visibleProducts = [];

    if(task === 'search') {
      console.log('search: ', value, visibleProducts.length);
      visibleProducts = this.state.products.filter(product => product.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
    console.log(visibleProducts.length);
    this.setState({visibleProducts});
  }

  render() {
    console.log('Render here.');
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
          <input className="featured-product-search" type="text" placeholder="Search products" onChange={(e) => this.applyFilter('search', e)} />
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
