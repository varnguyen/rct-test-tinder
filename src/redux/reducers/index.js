import { combineReducers } from 'redux';

import { get_new_user_reducer } from './get-new-user-reducer';

const reducer = combineReducers({
    // user
    get_new_user_reducer
});

export default reducer;