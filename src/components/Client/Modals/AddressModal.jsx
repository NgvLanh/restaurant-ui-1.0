import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AlertUtils from "../../../utils/AlertUtils";

const AddressModal = ({ show, handleClose, handleSave }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceId, setProvinceId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [wardId, setWardId] = useState('');
    const [shippingFee, setShippingFee] = useState(null);

    const token = import.meta.env.VITE_TOKEN_SHIPPING || '';
    const shopId = import.meta.env.VITE_ID_SHOP || '';

    useEffect(() => {
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (provinceId) {
            fetchDistricts(provinceId);
        } else {
            setDistricts([]);
            setWardId('');
            setShippingFee(null);
        }
    }, [provinceId]);

    useEffect(() => {
        if (districtId) {
            fetchWards(districtId);
        } else {
            setWards([]);
            setWardId('');
            setShippingFee(null);
        }
    }, [districtId]);

    useEffect(() => {
        if (provinceId && districtId && wardId) {
            calculateShippingFee();
        }
    }, [provinceId, districtId, wardId]);

    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: { 'Content-Type': 'application/json', 'Token': token }
            });
            const data = await response.json();
            setProvinces(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tỉnh:', error);
        }
    };

    const fetchDistricts = async (provinceId) => {
        try {
            const response = await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}&shop_id=${shopId}`, {
                headers: { 'Content-Type': 'application/json', 'Token': token }
            });
            const data = await response.json();
            setDistricts(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quận huyện:', error);
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const response = await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}&shop_id=${shopId}`, {
                headers: { 'Content-Type': 'application/json', 'Token': token }
            });
            const data = await response.json();
            setWards(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách xã phường:', error);
        }
    };

    const calculateShippingFee = () => {
        if (!districtId || !wardId) {
            AlertUtils.warning("Vui lòng chọn đầy đủ địa chỉ");
            return;
        }

        // const params = new URLSearchParams({
        //     from_district_id: 1574,
        //     from_ward_code: '550307',
        //     service_id: 53320,
        //     service_type_id: 2,
        //     to_district_id: districtId,
        //     to_ward_code: wardId,
        //     height: 10,
        //     length: 10,
        //     weight: 10,
        //     width: 10,
        //     insurance_value: 10000,
        //     cod_failed_amount: 2000,
        //     coupon: null
        // });

        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?', {
            method: 'GET',
            data: {
                service_type_id: 2,
                from_district_id: 3317,
                to_district_id: districtId,
                to_ward_code: '20314',
                height: 20,
                length: 30,
                weight: 3000,
                width: 40,
                insurance_value: 0,
                coupon: null,
                items: [
                    {
                        name: "TEST1",
                        quantity: 1,
                        height: 200,
                        weight: 1000,
                        length: 200,
                        width: 200,
                    },
                ],
            },
            headers: {
                'Content-Type': 'application/json',
                'Token': token,
                'ShopId': shopId
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.total) {
                    setShippingFee({
                        fee: data.data.total,
                        provinceName: provinces.find(p => p.ProvinceID === Number(provinceId))?.ProvinceName || '',
                        districtName: districts.find(d => d.DistrictID === Number(districtId))?.DistrictName || '',
                        wardName: wards.find(w => w.WardCode === wardId)?.WardName || '',
                        provinceId,
                        districtId,
                        wardId
                    });
                } else {
                    setShippingFee(null);
                }
            })
            .catch(error => {
                console.error('Lỗi khi tính phí vận chuyển:', error);
            });
    };

    const handleSaveClick = () => {
        if (!provinceId || !districtId || !wardId) {
            AlertUtils.warning("Vui lòng chọn đầy đủ địa chỉ");
            return;
        }
        const data = {
            provinceId: provinceId,
            districtId: districtId,
        }
        handleSave(shippingFee);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nhập thông tin giao hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formProvince">
                        <Form.Label>Tỉnh/Thành phố</Form.Label>
                        <Form.Select value={provinceId} onChange={(e) => setProvinceId(e.target.value)}>
                            <option value="">Chọn tỉnh/thành phố</option>
                            {provinces.map(province => (
                                <option key={province.ProvinceID} value={province.ProvinceID}>
                                    {province.ProvinceName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formDistrict">
                        <Form.Label>Quận/Huyện</Form.Label>
                        <Form.Select value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
                            <option value="">Chọn quận/huyện</option>
                            {districts.map(district => (
                                <option key={district.DistrictID} value={district.DistrictID}>
                                    {district.DistrictName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formWard">
                        <Form.Label>Xã/Phường</Form.Label>
                        <Form.Select value={wardId} onChange={(e) => setWardId(e.target.value)}>
                            <option value="">Chọn xã/phường</option>
                            {wards.map(ward => (
                                <option key={ward.WardCode} value={ward.WardCode}>
                                    {ward.WardName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    {shippingFee && (
                        <div className="mt-3">
                            <strong>Phí vận chuyển: {shippingFee.fee.toLocaleString('vi-VN')} VND</strong>
                            <div>Địa chỉ: {shippingFee.wardName}, {shippingFee.districtName}, {shippingFee.provinceName}</div>
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddressModal;
