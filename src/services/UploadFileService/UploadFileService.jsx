import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const uploadFile = async (file) => {
    if (file != undefined) {
        try {
            const response = await ApiRequest({
                method: 'POST',
                path: `files/upload`,
                data: file,
                headers: 'Bearer '
            });
            return response;
        } catch (error) {
            console.log("Lỗi upload file");

        }
    }
}