import { TYPES } from '../types'

export const get_new_user_reducer = (state = {}, { type, payload }) => {
    switch (type) {
        case TYPES.GET_NEW_USER_SUCCESS:
            return { ...state, payload, success: true }
        case TYPES.GET_NEW_USER_FAILED:
            return { ...state, payload, success: false }
        default:
            return state
    }
}