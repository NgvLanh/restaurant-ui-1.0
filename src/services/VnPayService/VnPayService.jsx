import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const vnPayService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'post',
            path: 'vnpay',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}