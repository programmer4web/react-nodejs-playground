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
    axios.get(`${this.props.serverUrl}products`).then(res => {
      const products = res.data || [];
      this.setState({ products });
    })
  }

  render() {
    return (
      <div className="featured-products">
        <h3>Featured Products</h3>
        <div className="featured-product-mode" onClick={this.handleMode} >{(this.state.productsMode == '') ? 'Simple' : 'Detailed'}</div>
        <ul className="featured-products-list">
          {this.state.products.map((data) => <li className="featured-product-line" key={`product-line-${data._id}`}>
            <Product data={data} mode={this.state.productsMode}
              actionText={"Add to wishlist"} actionJob={"add"} actionCallback={this.props.callback}/>
          </li>)}
        </ul>
      </div>
    );
  }

  handleMode(e) {
    this.setState({ productsMode: (this.state.productsMode === '') ? 'simple' : '' });
  }
}
