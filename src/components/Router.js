import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';

const Router = () => (
    
    <MyContextProvider>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
            </Switch>
        </BrowserRouter>
    </MyContextProvider>
    )

export default Router;