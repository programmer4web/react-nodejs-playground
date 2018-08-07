import React, {Component} from 'react';
import axios from 'axios';

import Product from './Product.js';

export default class FeaturedProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:7070/products').then( res => {
      const products = res.data;
      this.setState({products});
    }

    )
  }

  render() {
    return (
      <div className="featured-products">
        <h3>Featured Products</h3>
        <ul>
          {this.state.products.map((data, idx) => <li  key={"product-line-" + idx}><Product data={data} /></li>)}
        </ul>
      </div>
    );
  }
}
