const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Gọi hàm để chuyển tọa độ thành địa chỉ
                reverseGeocode(latitude, longitude);
            },
            (error) => {
                console.error("Lỗi khi lấy vị trí:", error);
            }
        );
    } else {
        alert("Trình duyệt của bạn không hỗ trợ định vị địa lý.");
    }
};

const reverseGeocode = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const loading = document.getElementById('spinner');
    loading.classList.add('show');
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; webapp/1.0; lanhnvpc06581@fpt.edu.vn)'
            }
        });
        const data = await response.json();

        if (data && data.address) {
            const { city, state, postcode, country } = data.address;
            console.log("Địa chỉ:", city, state, postcode, country);
        } else {
            console.error("Không thể lấy địa chỉ từ tọa độ.");
        }
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
    } finally {
        loading.classList.remove('show');
    }
};

// Gọi hàm khi trang tải lên
// window.onload = getLocation;

// window.addEventListener('beforeunload', function (event) {
//     this.localStorage.removeItem('user_info');
// });
