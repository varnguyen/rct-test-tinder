import { TYPES } from '../types'
export const get_new_user_action = (params = {}, callback) => ({
    type: TYPES.GET_NEW_USER,
    url: '/api/',
    method: 'get',
    params,
    callback
})