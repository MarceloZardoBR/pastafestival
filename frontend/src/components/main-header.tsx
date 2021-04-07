import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutBag from '../assets/food-delivery-128.png'

import './main-header.css';

const MainHeader: React.FC = () => {
    return (
        <div id="header-main-body">
            <Link to="/">
                <p>Pasta Festival</p>
            </Link>
            <button>
                <Link to="/cliente/cart">
                    <img src={CheckoutBag} />
                </Link>
            </button>
        </div>
    )
}

export default MainHeader;