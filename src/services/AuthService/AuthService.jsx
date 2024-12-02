import ApiRequest from "../../configs/ApiRequest/ApiRequest";

const getUserService = async () => {
    const response = await ApiRequest({
        method: 'POST',
        path: 'users/info',
        headers: 'Bearer '
    });
    return response?.data;
};

const registerService = async (request) => {
    return await ApiRequest({
        method: 'POST',
        path: 'users',
        data: request,
    });
};

const loginService = async (request) => {
    return await ApiRequest({
        method: 'POST',
        path: 'auth/login',
        data: request
    });
};


const loginGoogleService = async (request) => {
    return await ApiRequest({
        method: 'POST',
        path: 'auth/login-google',
        data: request
    });
};

const createEmployee = async (request) => {
    return await ApiRequest({
        method: 'POST',
        path: 'users/employee',
        data: request,
        headers: 'Bearer '
    });
};





export { getUserService, registerService, loginService, createEmployee, loginGoogleService };
