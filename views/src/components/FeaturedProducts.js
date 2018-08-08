import React, { Component } from 'react';
import axios from 'axios';

import Product from './Product.js';

export default class FeaturedProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productsMode: ''
    }

    this.handleMode = this.handleMode.bind(this);
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:7070/products').then(res => {
      const products = res.data;
      this.setState({ products });
    })
  }

  render() {
    return (
      <div className="featured-products">
        <h3>Featured Products</h3>
        <div className="featured-product-mode" onClick={this.handleMode} >{(this.state.productsMode == '') ? 'Simple' : 'Detailed'}</div>
        <ul className="featured-products-list">
          {this.state.products.map((data, idx) => <li className="featured-product-line" key={"product-line-" + idx}>
            <Product data={data} mode={this.state.productsMode} actionText={"Add to wishlist"} actionJob={"add"}/>
          </li>)}
        </ul>
      </div>
    );
  }

  handleMode(e) {
    this.setState({ productsMode: (this.state.productsMode === '') ? 'simple' : '' });
  }
}
