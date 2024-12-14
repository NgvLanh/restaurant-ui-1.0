import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerService } from '../../../services/AuthService/AuthService';
import AlertUtils from '../../../utils/AlertUtils';

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (reuqest) => {
        const { confirmPassword, ...reRequest } = reuqest;
        try {
            const response = await registerService(reRequest);
            if (response?.status) {
                AlertUtils.success("Đăng ký thành công!");
                navigate('/login');
            }
        } catch (error) {
            AlertUtils.error(error?.response?.data?.message);
        }
    };

    const password = watch("password");

    return (
        <div className="container my-5">
            <div className="row">
                {/* Image Section */}
                <div className="col-md-6">
                    <img
                        src="src/assets/img/carousel-1.jpg"
                        alt="Registration"
                        className="img-fluid rounded h-100"
                    />
                </div>

                {/* Form Section */}
                <div className="col-md-6">
                    <div className="section-title text-start">
                        <h1 className="display-5 mb-4">Đăng Ký Tài Khoản</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Tên của bạn'
                                    {...register("fullName", { required: "Vui lòng nhập tên của bạn" })}
                                />
                                <label className="fullName">Tên của bạn</label>
                                {errors.fullName && <p className="text-danger mt-2">{errors.fullName.message}</p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder='Email của bạn'
                                    {...register("email", {
                                        required: "Vui lòng nhập email",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Email không hợp lệ"
                                        }
                                    })}
                                />
                                <label className="email">Email của bạn</label>
                                {errors.email && <p className="text-danger mt-2">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Số điện thoại"
                                    {...register("phoneNumber", {
                                        required: "Vui lòng nhập số điện thoại",
                                        pattern: {
                                            value: /^[0-9]{10,11}$/,
                                            message: "Số điện thoại không hợp lệ"
                                        }
                                    })}
                                />
                                <label className="phoneNumber">Số điện thoại</label>
                                {errors.phoneNumber && <p className="text-danger mt-2">{errors.phoneNumber.message}</p>}
                            </div>
                        </div>


                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder='Mật khẩu'
                                    {...register("password", {
                                        required: "Vui lòng nhập mật khẩu",
                                        minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
                                    })}
                                />
                                <label className="password">Mật khẩu</label>
                                {errors.password && <p className="text-danger mt-2">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder='Xác nhận mật khẩu'
                                    {...register("confirmPassword", {
                                        required: "Vui lòng xác nhận mật khẩu",
                                        validate: value => value === password || "Mật khẩu không khớp"
                                    })}
                                />
                                <label className="confirmPassword">Xác nhận mật khẩu</label>
                                {errors.confirmPassword && <p className="text-danger mt-2">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Đăng Ký</button>
                        <div className="mt-3">
                            <div className="d-flex justify-content-center align-items-center">
                                <Link to="/login">Đăng nhập</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
