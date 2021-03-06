import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CustomButton from './CustomButton.jsx';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render() {
    const product = this.state.data,
      images = product.images,
      image = images && images[0];
    return (
      <div className={`product ${this.props.mode}`}>
        <div className="product-header">
          <div className="product-title" title={product.name}>{product.name}</div>
        </div>
        <div className="product-properties">
          <div className="product-price">Price:
          {
          product.price && product.price.amount && product.price.currency ?
            product.price.amount + ' ' + product.price.currency
            : product.price ? product.price + 'EUR':''
          }
          </div>
          {product.size && <div className="product-size">Size: {product.size}</div>}
          {product.power && <div className="product-power">Power: {product.power}</div>}
        </div>
        <div className="product-details">
          <div className="product-image">
            <img className="product-img" src={image && image.src ? image.src : 'http://placehold.it/150x150/637d9f/ffffff'} width={150} height={150} />
          </div>
          <div className="product-actions">
            <CustomButton text={this.props.actionText} icon={this.props.actionIcon}
              callback={this.props.callback} id={product._id} />
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  mode: PropTypes.string,
  actionText: PropTypes.string,
  actionIcon: PropTypes.string,
  callback: PropTypes.func
}
