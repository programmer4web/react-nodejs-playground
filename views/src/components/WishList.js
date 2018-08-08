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

        // this.updateData = this.updateData.bind(this);
    }

    componentDidMount() {
       this.updateData();
    }

    render() {
        console.log("asdasdasda");
        return (
            <div className="wishlist-products">
                <h3>WishList</h3>
                <ul className="wishlist-products-list">
                    {this.state.products.map((data, idx) => <li className="featured-product-line" key={"product-line-" + idx}>
                        <Product data={data} actionText={"Remove from wishlist"} actionJob={"delete"} actionCallback={this.updateData}/></li>
                    )}
                </ul>
            </div>
        )
    }
    updateData(wishlist) {
        console.log(wishlist);
        axios.get('http://127.0.0.1:7070/users/5b646febeebb915ff8b221be').then(res => {
            const userWishlist = res.data.wishlist;
            //this.setState({ userWishlist });
            axios.get('http://127.0.0.1:7070/products/',
                {
                    'params': { 'ids': userWishlist },
                    'paramsSerializer': function (params) {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                }).then(result => {
                    console.log(result.data);
                    this.setState({ products: result.data });
                })
        })

    }
}