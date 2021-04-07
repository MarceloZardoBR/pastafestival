import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import CartHeader from './pages/Cart';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Route path="/" component={Login} exact />
            <Route path="/cliente/register/:cpf?" component={Register} />
            <Route path="/pastafestival/main" component={Main} /> 
            <Route path="/cliente/cart" component={CartHeader} />
        </BrowserRouter>
    )
}

export default Routes;