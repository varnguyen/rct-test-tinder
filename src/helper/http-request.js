import axios from "axios";

const httpRequest = async (api_name = "", method = "get", headers = {}, params = undefined, data = undefined) => {
    return await axios({
        method,
        headers,
        url: `https://randomuser.me/${api_name}`,
        params,
        data
    })
}

export default httpRequest;