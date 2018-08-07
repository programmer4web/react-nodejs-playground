import React, {Component, PropTypes} from 'react';
import Axios from 'axios';

export default class Action extends Component {
  constructor(props){
    super(props);
    this.handleClickAction = this.handleClickAction.bind(this);
  }
  render() {
    return <div className="action" onClick={this.handleClickAction}>{this.props.text}</div>
  }
  handleClickAction(e) {
    e.preventDefault();
    const productId = this.props.id;
    Axios.get(this.props.url).then(response => {
      const userWishlist = response.data.wishlist,
        idx = userWishlist.indexOf(productId);
        
      if(idx === -1) {
        userWishlist.push(productId);
        Axios.put(this.props.url,{wishlist: userWishlist}).then(res => {
        this.setState({wishlist: res.wishlist});
      });
      } {
        console.warn('product is already in wishlist.');
      }
    });
  }
}



// Action.propTypes = {
//   text: PropTypes.string
// }
