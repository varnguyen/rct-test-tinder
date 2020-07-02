import http_request from './../helper/http-request';

const get_new_user = () => {
    const url = 'https://randomuser.me/api/';
    return http_request(url);
}

export default get_new_user;