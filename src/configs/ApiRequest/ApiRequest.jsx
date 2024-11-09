import axios from "axios";
import { Cookies } from "react-cookie";

const BASE_URL = 'http://localhost:8080/api/';


const ApiRequest = async ({ method = 'GET', path = '', data = {}, headers = {} }) => {
    const cookie = new Cookies();
    const token = cookie.get('user_token');
    
    const response = await axios({
        method: method,
        baseURL: BASE_URL,
        url: path,
        data: data,
        headers: {
            Authorization: `${headers}${token}`,
        },
    })
    return response.data;
}

export default ApiRequest;