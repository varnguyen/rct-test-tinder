import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancers = compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f);
const store = createStore(reducers, enhancers);
sagaMiddleware.run(rootSaga);

export default store;