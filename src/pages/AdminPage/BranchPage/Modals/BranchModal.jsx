import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { getAllBranchStatus } from '../../../../services/BranchStatusService/BranchStatusService';

const BranchModal = ({ showModal, closeModal, initialValues, handleData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceId, setProvinceId] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [wardId, setWardId] = useState("");
    const [branchStatuses, setBranchStatuses] = useState([]);
    const tokenShipping = import.meta.env.VITE_TOKEN_SHIPPING || "";
    const idShop = import.meta.env.VITE_ID_SHOP || "";

    useEffect(() => {
        reset();
        const fetchData = async () => {
            await fetchBranchStatus();
            await fetchProvinces();
            if (initialValues) {
                setValue("name", initialValues.name);
                setValue("phoneNumber", initialValues.phoneNumber);
                setValue("provinceId", initialValues.provinceId);

                await fetchDistricts(initialValues.provinceId);
                setTimeout(() => {
                    setValue("districtId", initialValues.districtId);
                }, 200);

                await fetchWards(initialValues.districtId);
                setTimeout(() => {
                    setValue("wardId", initialValues.wardId);
                }, 300);

                setValue("branchStatus", initialValues.branchStatus?.id);
                setValue("address", initialValues.address);
            } else {
                reset();
                setProvinceId("");
                setDistrictId("");
                setWardId("");
                setDistricts([]);
                setWards([]);
            }
        };

        fetchData();
    }, [initialValues, setValue, reset]);


    useEffect(() => {
        if (provinceId) {
            fetchDistricts(provinceId);
        } else {
            setDistricts([]);
            setWardId('');
        }
    }, [provinceId]);

    useEffect(() => {
        if (districtId) {
            fetchWards(districtId);
        } else {
            setWards([]);
            setWardId('');
        }
    }, [districtId]);

    const fetchBranchStatus = async () => {
        setBranchStatuses(await getAllBranchStatus());
    }

    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: { 'Content-Type': 'application/json', 'Token': tokenShipping }
            });
            const data = await response.json();
            setProvinces(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tỉnh:', error);
        }
    };

    const fetchDistricts = async (provinceId) => {
        try {
            const response = await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}&shop_id=${idShop}`, {
                headers: { 'Content-Type': 'application/json', 'Token': tokenShipping }
            });
            const data = await response.json();
            setDistricts(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quận huyện:', error);
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const response = await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}&shop_id=${idShop}`, {
                headers: { 'Content-Type': 'application/json', 'Token': tokenShipping }
            });
            const data = await response.json();
            setWards(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách xã phường:', error);
        }
    };
    const onSubmit = (data) => {
        handleData(data);
        closeModal(false);
        reset();
    };


    const handleReset = async () => {
        if (initialValues) {
            setValue("name", initialValues.name);
            setValue("phoneNumber", initialValues.phoneNumber);
            setValue("provinceId", initialValues.provinceId);

            await fetchDistricts(initialValues.provinceId);
            setValue("districtId", initialValues.districtId);

            await fetchWards(initialValues.districtId);
            setValue("wardId", initialValues.wardId);

            setValue("branchStatus", initialValues.branchStatus?.id);
            setValue("address", initialValues.address);
        } else {
            reset(); // Xóa toàn bộ dữ liệu của form
            setProvinceId("");
            setDistrictId("");
            setWardId("");
            setDistricts([]);
            setWards([]);
        }
    };


    return (
        <Modal show={showModal} onHide={() => closeModal(false)} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{initialValues ? 'Cập nhật Chi nhánh' : 'Thêm Chi nhánh'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="name">
                                <Form.Label>Tên chi nhánh</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên chi nhánh"
                                    {...register('name', { required: 'Tên chi nhánh không được để trống' })}
                                    isInvalid={errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    {...register('phoneNumber', {
                                        required: 'Số điện thoại không được để trống',
                                        pattern: {
                                            value: /^(03|08|09)\d{8}$/,
                                            message: 'Số điện thoại không hợp lệ, phải bắt đầu bằng 03, 08, 09 và có 10 chữ số'
                                        }
                                    })}
                                    isInvalid={errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="provinceId">
                                <Form.Label>Thành phố</Form.Label>
                                <Form.Select
                                    {...register('provinceId', { required: 'Vui lòng chọn thành phố' })}
                                    isInvalid={errors.provinceId}
                                    onChange={(e) => {
                                        const selectedProvinceId = e.target.value;
                                        const selectedProvinceName = e.target.selectedOptions[0].text;
                                        setProvinceId(selectedProvinceId);
                                        setValue('provinceName', selectedProvinceName);
                                    }}
                                >
                                    <option value="">Chọn thành phố...</option>
                                    {provinces?.map((province) => (
                                        <option key={province.ProvinceID} value={province.ProvinceID}>
                                            {province.ProvinceName}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.provinceId?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="districtId">
                                <Form.Label>Quận/Huyện</Form.Label>
                                <Form.Select
                                    {...register('districtId', { required: 'Vui lòng chọn quận/huyện' })}
                                    isInvalid={errors.districtId}
                                    onChange={(e) => {
                                        const selectedDistrictId = e.target.value;
                                        const selectedDistrictName = e.target.selectedOptions[0].text;
                                        setDistrictId(selectedDistrictId);
                                        setValue('districtName', selectedDistrictName);
                                    }}
                                >
                                    <option value="">Chọn quận/huyện...</option>
                                    {districts?.map((district) => (
                                        <option key={district.DistrictID} value={district.DistrictID}>
                                            {district.DistrictName}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.districtId?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="wardId">
                                <Form.Label>Phường/Xã</Form.Label>
                                <Form.Select
                                    {...register('wardId', { required: 'Vui lòng chọn phường/xã' })}
                                    isInvalid={errors.wardId}
                                    onChange={(e) => {
                                        const selectedWardId = e.target.value;
                                        const selectedWardName = e.target.selectedOptions[0].text;
                                        setWardId(selectedWardId);
                                        setValue('wardName', selectedWardName);
                                    }}
                                >
                                    <option value="">Chọn phường/xã...</option>
                                    {wards?.map((ward) => (
                                        <option key={ward.WardCode} value={ward.WardCode}>
                                            {ward.WardName}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.wardId?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="branchStatus">
                                <Form.Label>Trạng thái</Form.Label>
                                <Form.Select
                                    {...register('branchStatus', { required: 'Vui lòng chọn trạng thái' })}
                                    isInvalid={errors.branchStatus}
                                >
                                    <option value="">Chọn trạng thái...</option>
                                    {branchStatuses?.map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.branchStatus?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="address">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    {...register('address')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-3">
                        <Button type="button" variant="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button type="submit" variant="primary">
                            Lưu
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

    );
};

export default BranchModal;
