import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const orderOffLineService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'post',
            path: 'orders',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const orderOnLineService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'post',
            path: 'orders',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}