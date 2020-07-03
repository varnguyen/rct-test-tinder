import { put, takeLatest } from 'redux-saga/effects';
import httpRequest from '../../helper/http-request';
import { TYPES } from '../types';

export function* watch_get_new_user() {
    yield takeLatest(TYPES.GET_NEW_USER, work_get_new_user)
}

export function* work_get_new_user({ url, method, params, data, callback }) {
    try {
        // Try to call the API
        const response = yield httpRequest(url, method, params, data)

        // Dispatch the action to the reducers
        yield put({
            type: TYPES.GET_NEW_USER_SUCCESS,
            payload: { ...response }
        })
    } catch (error) {
        // Act on the error
        console.log('Request failed! Could not fetch data. work_get_new_user')
        yield put({
            type: TYPES.GET_NEW_USER_FAILED,
            payload: []
        })
    }
}