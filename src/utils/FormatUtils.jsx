import moment from 'moment';

const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD/MM/YYYY - HH:mm:ss');
};

const formatCurrency = (amount) => {
    if (isNaN(amount)) return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const formatNumber = (number) => {
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('vi-VN').format(number);
};

export { formatDate, formatCurrency, formatNumber };
