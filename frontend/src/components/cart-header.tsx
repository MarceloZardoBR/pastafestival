import React from 'react';
import { Link } from 'react-router-dom';

import ShopIcon from '../assets/shop.png';

import './cart-header.css';

export default () => {
    return (
        <div id="header-cart-body">
            <Link to="/pastafestival/main">
                <p>Pasta Festival</p>
            </Link>
            <button>
                <Link to="/pastafestival/main">
                    <img src={ShopIcon} />
                </Link>
            </button>
        </div>
    )
}