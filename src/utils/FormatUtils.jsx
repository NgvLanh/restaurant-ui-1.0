import moment from 'moment';

export const formatDateTime = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD/MM/YYYY - HH:mm:ss');
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD/MM/YYYY');
};

export const formatTime = (timeString) => {
    if (!timeString) return '';
    return moment(timeString, 'HH:mm:ss').format('HH:mm:ss');
};

export const formatCurrency = (amount) => {
    if (isNaN(amount)) return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const formatNumber = (number) => {
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('vi-VN').format(number);
};
