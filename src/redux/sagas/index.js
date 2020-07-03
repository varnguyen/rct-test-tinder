import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import { watch_get_new_user } from './get-new-user-saga';

export default function* rootSaga() {
    yield all([
        // user 
        watch_get_new_user(),
    ])
}