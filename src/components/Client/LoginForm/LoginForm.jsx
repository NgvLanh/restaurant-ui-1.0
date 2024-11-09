import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginService } from '../../../services/AuthService/AuthService';
import AlertUtils from '../../../utils/AlertUtils';
import { useCookies } from 'react-cookie';
import { asyncCartService } from '../../../services/CartService/CartService'

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cookie, setCookie] = useCookies(['user_token']);
    const cartTemp = JSON.parse(localStorage.getItem('cart_temp'))
    const navigate = useNavigate();

    const onSubmit = async (reuqest) => {
        const response = await loginService(reuqest);
        if (response?.status) {
            AlertUtils.success('Đăng nhập thành công');
            saveLocalAndCookie(response?.data);
            syncCartWithServer();
        } else {
            AlertUtils.error(response?.message);
        }
    };

    const saveLocalAndCookie = (data) => {
        localStorage.setItem('user_info', JSON.stringify(data?.info));
        setCookie('user_token', data?.accessToken);
    }

    const roleRoute = (data) => {
        const role = data?.role[0];
        if (role === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/home');
        }
        navigate(0);
    }

    const syncCartWithServer = async () => {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        console.log(userInfo);
        console.log(await asyncCartService(cartTemp, userInfo?.id));
        // roleRoute(data?.info);
    }

    return (
        <div className="container my-5">
            <div className="row">
                {/* Form Section */}
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="section-title text-start">
                        <h1 className="display-5 mb-4">Đăng Nhập</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
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
                                <label htmlFor="email">Email của bạn</label>
                                {errors.email && <p className="text-danger mt-2">{errors.email.message}</p>}
                            </div>

                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder='Mật khẩu của bạn'
                                    {...register("password", {
                                        required: "Vui lòng nhập mật khẩu",
                                        // minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
                                    })}
                                />
                                <label className="password">Mật khẩu</label>
                                {errors.password && <p className="text-danger mt-2">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div className="mb-1">
                            <button type="submit" className="btn btn-primary w-100">Đăng Nhập</button>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary w-100">
                                <span><i className="fa bi-google me-2"></i>Đăng nhập với Google</span>
                            </button>
                        </div>
                        <div className="mt-2">
                            <div className="d-flex justify-content-between align-items-center mx-2">
                                <Link to="/register">Chưa có tài khoản?</Link>
                                <Link to="/forgot-password">Quên mật khẩu</Link>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Image Section */}
                <div className="col-md-6">
                    <img
                        src="https://via.placeholder.com/500x500"
                        alt="Login Illustration"
                        className="img-fluid rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
