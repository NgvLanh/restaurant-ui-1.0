import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";

const MapPage = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [randomPosition, setRandomPosition] = useState(null);

    // Load Google Maps
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" // Thay thế bằng API key của bạn
    });

    // Lấy vị trí hiện tại của người dùng
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });

                // Tạo một vị trí ngẫu nhiên gần vị trí hiện tại
                const randomLat = latitude + (Math.random() - 0.5) * 0.02;
                const randomLng = longitude + (Math.random() - 0.5) * 0.02;
                setRandomPosition({ lat: randomLat, lng: randomLng });
            },
            () => alert("Không thể lấy vị trí của bạn")
        );
    }, []);

    if (!isLoaded) return <div>Đang tải bản đồ...</div>;

    return (
        <>
            <PageHeader title="Bản đồ" />
            <GoogleMap
                center={currentPosition || { lat: 10.762622, lng: 106.660172 }}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "500px" }}
            >
                {currentPosition && <Marker position={currentPosition} label="Vị trí hiện tại" />}
                {randomPosition && <Marker position={randomPosition} label="Vị trí ngẫu nhiên" />}
            </GoogleMap>
        </>
    );
};

export default MapPage;
