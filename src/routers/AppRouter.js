import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.scss';

import React, { Component, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from '../pages/header/Header';
import Home from '../pages/home/Home';
import FavoriteList from '../pages/favorite-list/FavoriteList';

// const NotFound = lazy(() => import('../pages/commons/404/NotFound'));

class AppRouter extends Component {
    render() {
        return (<BrowserRouter forceRefresh={false} >

            <Suspense>

                <Header {...this.props}></Header>

                <Container fluid="md" id="main-content">

                    <Switch onUpdate={() => window.scrollTo(0, 0)}>
                        <Route exact path="/home" render={(props) => (<Home {...props} />)} />
                        <Route exact path="/favorite-list" render={(props) => (<FavoriteList {...props} />)} />

                        {/* <Route exact path="/404" render={(props) => <NotFound {...props} />} /> */}
                        <Route exact path="/" render={(props) => <Home {...props} />} />
                        <Route path="*" render={(props) => <Redirect to={{ pathname: `/404` }} />} />
                    </Switch>

                </Container>

            </Suspense>

        </BrowserRouter>)
    }
}

export default AppRouter;