import axios from "axios";
import { Cookies } from "react-cookie";
import AlertUtils from "../../utils/AlertUtils";

const BASE_URL = 'http://localhost:8080/api/';


const ApiRequest = async ({ method = 'GET', path = '', data = {}, headers = {} }) => {
    const cookie = new Cookies();
    const token = cookie.get('user_token');

    try {
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
    } catch (error) {
        console.log(`Lỗi: ${error}`);
    }
}

export default ApiRequest;