import React from 'react';

import './simple-header.css';
import { Link } from 'react-router-dom';

const SimpleHeader = () => {
    return (
        <div id="header-body">
            <Link to="/">
                <p>Pasta Festival</p>
            </Link>
        </div>
    )
}

export default SimpleHeader;