import React, {Component} from 'react';
import Action from './Action.js';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render() {
    const product = this.state.data,
      images = product.images,
      image = product.images && product.images[0];
    return (
      <div className="product">
        <div className="product-header">
          <div className="product-title">{product.name}</div>
        </div>
        <div className="product-properties">
          <div className="product-price">Price:
          {
          product.price && product.price.amount && product.price.currency ?
            product.price.amount + ' ' + product.price.currency 
            : product.price ? product.price + 'EUR':''
          }
          </div>
          <div className="product-size">Size: {product.size}</div>
          {image && image.src &&
            <div className="product-image">
              <img src={image.src} width={100} height={100} />
            </div>
          }
        </div>
        <div className="product-actions">
          <Action text="Add to wishlist" />
        </div>
      </div>
    );
  }
}
