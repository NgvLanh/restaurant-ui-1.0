import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getAllBranchStatus } from '../../../services/BranchStatusService/BranchStatusService';

const ReusableModal = ({ show, onClose, title, onSubmit, inputs, initialValues = {} }) => {
    const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceId, setProvinceId] = useState("");
    const [provinceName, setProvinceName] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [wardId, setWardId] = useState("");
    const [wardName, setWardName] = useState("");
    const [branchStatus, setBranchStatus] = useState([]);

    const tokenShipping = import.meta.env.VITE_TOKEN_SHIPPING || "";
    const idShop = import.meta.env.VITE_ID_SHOP || "";

    useEffect(() => {
        fetchBranchStatus();
        fetchProvinces();
        inputs.forEach(input => {
            setValue(input.name, initialValues?.[input.name] || '');
        });
        if (initialValues) {

            document.getElementById('spinner').classList.add('show');

            setValue('branchStatus', initialValues?.branchStatus?.id);
            
            setProvinceId(initialValues?.provinceId);
            setTimeout(() => {
                setValue('districtId', initialValues?.districtId);
                setDistrictId(initialValues?.districtId);
            }, 500);
            setTimeout(() => {
                setValue('wardId', initialValues?.wardId);
            }, 1000);
            document.getElementById('spinner').classList.remove('show');
        }
    }, [show, initialValues, inputs, setValue]);

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
        setBranchStatus(await getAllBranchStatus());
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

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    const handleReset = () => {
        if (show && initialValues) {
            inputs.forEach(input => {
                setValue(input.name, initialValues[input.name] || '');
            });
        }
    };

    return (
        <Modal show={show} onHide={onClose} size={inputs.length > 4 ? 'lg' : 'md'}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="row">
                        {inputs.map((input, index) => (
                            <div key={index} className={`form-group mb-3 col-md-${input.colSize || 12}`}>
                                <label className="form-label" htmlFor={input.name}>{input.label}</label>
                                {input.type === 'select' && input.name === 'provinceId' ? (
                                    <select
                                        id={input.name}
                                        {...register(input.name, input.validation)}
                                        className="form-control px-2 py-2"
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;
                                            const selectedText = e.target.options[e.target.selectedIndex].text;
                                            setProvinceId(selectedValue);
                                            setProvinceName(selectedText);
                                            setValue('provinceName', selectedText);
                                        }}
                                    >
                                        <option value="">--Chọn thành phố--</option>
                                        {provinces?.map((province, idx) => (
                                            <option key={idx} value={province.ProvinceID}>{province.ProvinceName}</option>
                                        ))}
                                    </select>
                                ) : input.type === 'select' && input.name === 'districtId' ? (
                                    <select
                                        id={input.name}
                                        {...register(input.name, input.validation)}
                                        className="form-control px-2 py-2"
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;
                                            const selectedText = e.target.options[e.target.selectedIndex].text;
                                            setDistrictId(selectedValue);
                                            setDistrictName(selectedText);
                                            setValue('districtName', selectedText);
                                        }}
                                    >
                                        <option value="">--Chọn quận/huyện--</option>
                                        {districts?.map((district, idx) => (
                                            <option key={idx} value={district.DistrictID}>{district.DistrictName}</option>
                                        ))}
                                    </select>
                                ) : input.type === 'select' && input.name === 'wardId' ? (
                                    <select
                                        id={input.name}
                                        {...register(input.name, input.validation)}
                                        className="form-control px-2 py-2"
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;
                                            const selectedText = e.target.options[e.target.selectedIndex].text;
                                            setWardId(selectedValue);
                                            setWardName(selectedText);
                                            setValue('wardName', selectedText);
                                        }}
                                    >
                                        <option value="">--Chọn phường/xã--</option>
                                        {wards?.map((ward, idx) => (
                                            <option key={idx} value={ward.WardCode}>{ward.WardName}</option>
                                        ))}
                                    </select>

                                ) : input.type === 'select' && input.name === 'branchStatus' ? (
                                    <select
                                        id={input.name}
                                        {...register(input.name, input.validation)}
                                        className="form-control px-2 py-2"
                                    >
                                        <option value="">--Chọn trạng thái--</option>
                                        {branchStatus?.map((bs, idx) => (
                                            <option key={idx} value={bs.id}>{bs.name}</option>
                                        ))}
                                    </select>

                                ) : (
                                    <input
                                        id={input.name}
                                        type={input.type || 'text'}
                                        placeholder={input.placeholder || ''}
                                        {...register(input.name, input.validation)}
                                        className="form-control px-y py-2"
                                    />
                                )}
                                {errors[input.name] && (
                                    <p className="error-message text-danger mt-2">{errors[input.name].message}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-end gap-1">
                        <Button type="button" variant="dark" className="mt-3" onClick={() => onClose()}>
                            Đóng
                        </Button>
                        <Button type="submit" variant="primary" className="mt-3">
                            Lưu
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    );
};

export default ReusableModal;
