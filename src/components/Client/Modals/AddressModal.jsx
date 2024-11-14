import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AlertUtils from "../../../utils/AlertUtils";

const AddressModal = ({ show, handleClose, handleSave }) => {
    const branchInfo = JSON.parse(localStorage.getItem('branch_info'));
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceId, setProvinceId] = useState(branchInfo?.provinceId);
    const [districtId, setDistrictId] = useState('');
    const [wardId, setWardId] = useState('');
    const [shippingFee, setShippingFee] = useState(null);

    const token = import.meta.env.VITE_TOKEN_SHIPPING || '';
    const shopId = import.meta.env.VITE_ID_SHOP || '';

    useEffect(() => {
        if (branchInfo?.provinceId) {
            fetchDistricts(branchInfo?.provinceId);
        } else {
            setDistricts([]);
            setWardId('');
            setShippingFee(null);
        }
    }, [branchInfo?.provinceId]);

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

        const requestData = {
            from_district_id: 1454,
            from_ward_code: "21211",
            service_id: 53320,
            service_type_id: null,
            to_district_id: 1452,
            to_ward_code: "21012",
            height: 50,
            length: 20,
            weight: 200,
            width: 20,
            insurance_value: 10000,
            cod_failed_amount: 2000,
            coupon: null,
            items: [
                {
                    name: "product",
                    quantity: 1,
                    height: 200,
                    weight: 1000,
                    length: 200,
                    width: 200
                }
            ]
        };

        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?', {
            method: 'POST',
            body: JSON.stringify(requestData),
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
                        provinceName: branchInfo?.provinceName || '',
                        districtName: districts.find(d => d.DistrictID === Number(districtId))?.DistrictName || '',
                        wardName: wards.find(w => w.WardCode === wardId)?.WardName || '',
                        provinceId,
                        districtId,
                        wardId,
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

        handleSave({
            ...shippingFee, address: document.getElementById('shipping-address').textContent.split(': ')[1]
        });

        setDistrictId('');
        setWardId('');
        setShippingFee(null);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nhập thông tin giao hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                            <div id="shipping-address">Địa chỉ: {shippingFee.wardName}, {shippingFee.districtName}, {shippingFee.provinceName}</div>
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
