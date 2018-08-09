import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

import Product from './Product.js';

export default class WishList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userWishlist: [],
            products: []
        }

        this.updateData = this.updateData.bind(this);
    }

    componentDidMount() {
       this.updateData();
    }

    render() {
        console.log("render here.");
        return (
            <div className="wishlist-products">
                <h3>WishList</h3>
                <ul className="wishlist-products-list">
                    {this.state.products.map((data) => <li className="featured-product-line" key={`product-line-${data._id}`}>
                        <Product data={data} actionText={"Remove from wishlist"} actionJob={"delete"} actionCallback={this.updateData}/></li>
                    )}
                </ul>
            </div>
        )
    }
    updateData(wishlist) {
      const serverUrl = this.props.serverUrl;
        // console.log(wishlist);
        axios.get(`${serverUrl}users/5b646febeebb915ff8b221be`).then(res => {
            const userWishlist = res.data.wishlist;

            if(!Array.isArray(userWishlist) || userWishlist.length === 0) {
              this.setState({ products: [] });
              return;
            }
            axios.get(`${serverUrl}products/`,
                {
                    'params': { 'ids': userWishlist },
                    'paramsSerializer': params => qs.stringify(params, { arrayFormat: 'repeat' })
                }).then(result => {
                    // console.log(result.data);
                    this.setState({ products: result.data });
                })
        })
    }
}
