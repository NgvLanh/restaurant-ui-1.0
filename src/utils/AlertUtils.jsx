import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AlertUtils = {
    success: (message = 'Thành công!', title = 'Thông báo') => {
        MySwal.fire({
            title,
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    },

    warning: (message = 'Cảnh báo!', title = 'Thông báo') => {
        MySwal.fire({
            title,
            text: message,
            icon: 'warning',
            confirmButtonText: 'OK',
        });
    },

    error: (message = 'Đã có lỗi xảy ra!', title = 'Lỗi') => {
        MySwal.fire({
            title,
            text: message,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    },

    info: (message = 'Thông tin cần biết', title = 'Thông báo') => {
        MySwal.fire({
            title,
            text: message,
            icon: 'info',
            confirmButtonText: 'Có',
        });
    },

    confirm: async (message = 'Bạn có chắc chắn?', title = 'Xác nhận') => {
        const result = await MySwal.fire({
            title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
        });
        return result.isConfirmed;
    },

    input: async (message = 'Nhập thông tin của bạn', title = 'Nhập liệu') => {
        const result = await MySwal.fire({
            title,
            text: message,
            input: 'text',
            inputPlaceholder: 'Nhập vào đây...',
            showCancelButton: true,
            confirmButtonText: 'Gửi',
            cancelButtonText: 'Hủy',
        });

        return result.isConfirmed ? result.value : null;
    }
};

export default AlertUtils;
