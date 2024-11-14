import moment from 'moment';

const formatDateTime = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD/MM/YYYY - HH:mm:ss');
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD/MM/YYYY');
};

const formatCurrency = (amount) => {
    if (isNaN(amount)) return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const formatNumber = (number) => {
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('vi-VN').format(number);
};

export { formatDateTime, formatDate, formatCurrency, formatNumber };
