import React, { Component, PropTypes } from 'react';
import Axios from 'axios';

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.handleClickAction = this.handleClickAction.bind(this);
  }
  render() {
    return <div className="action" onClick={this.handleClickAction}>{this.props.text}</div>
  }
  handleClickAction(e) {
    e.preventDefault();
    const props = this.props,
      productId = props.id,
      job = props.job,
      url = props.url;

    if (job == 'add') {
      Axios.get(url).then(response => {
        const userWishlist = response.data.wishlist,
          idx = userWishlist.indexOf(productId);

        if (idx === -1) {
          userWishlist.push(productId);
          Axios.put(url, { wishlist: userWishlist }).then(res => {
            this.props.callback(res.wishlist);
          });
        } else {
          console.warn('product is already in wishlist.');
        }
      });
    } else if (job == 'delete') {
      this.props.removeProduct(productId);
    }
  }
}



// Action.propTypes = {
//   text: PropTypes.string
// }
