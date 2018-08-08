import React, {Component} from 'react';
import axios from 'axios';

import Product from './Product.js';

export default class WishList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userWishlist: [],
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:7070/users/5b646febeebb915ff8b221be').then(res => {
            const userWishlist = res.data.wishlist;
            this.setState({userWishlist});
        })
        
    }

    render() {
        return(
            <div className="wishlist-products">
                <h3>WishList</h3>
                <ul className="wishlist-products-list">
                {this.state.products.map((data, idx) => <li className="featured-product-line" key={"product-line-" + idx}><Product data={data} /></li>)}
                </ul>
            </div>
        )
    }
}