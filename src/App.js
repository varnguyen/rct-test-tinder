import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './redux/store/store';
import AppRouter from './routers/AppRouter';

class App extends Component {
    render() {
        return (<Provider store={store} >
            <AppRouter />
        </Provider>)
    }
}

export default App;
