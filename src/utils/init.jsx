window.addEventListener('beforeunload', function (event) {
    this.localStorage.removeItem('user_info');
});
