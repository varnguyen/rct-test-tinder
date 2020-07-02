import React, { Component } from 'react';
import AppRouter from './routers/AppRouter';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
    render() {
        return (<BrowserRouter>
            <AppRouter />
        </BrowserRouter>)
    }
}

export default App;
