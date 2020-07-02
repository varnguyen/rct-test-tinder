import axios from "axios";

const http_request = async (url = "", method = "get", headers = {}, params = undefined, data = undefined) => {
    return await axios({
        method,
        headers,
        url,
        params,
        data
    })
}

export default http_request;