import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginGoogleService, loginService } from '../../../services/AuthService/AuthService';
import AlertUtils from '../../../utils/AlertUtils';
import { useCookies } from 'react-cookie';
import { asyncCartService } from '../../../services/CartService/CartService'
import { getAllBranches, getBranchByUserId } from '../../../services/BranchService/BranchService';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [branches, setBranches] = useState([])
    const [cookie, setCookie] = useCookies(['user_token']);
    const cartTemp = JSON.parse(localStorage.getItem('cart_temps'))
    const navigate = useNavigate();

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        setBranches(await getAllBranches());
    }

    const onSubmit = async (request) => {
        try {
            const response = await loginService(request);
            if (response?.status) {
                AlertUtils.success('Đăng nhập thành công');
                saveLocalAndCookie(response?.data);
                syncCartWithServer(response?.data);
            }
        } catch (error) {
            AlertUtils.error(error.response?.data?.message);
        }
    };

    const saveLocalAndCookie = (data) => {
        localStorage.setItem('user_info', JSON.stringify(data?.info));
        setCookie('user_token', data?.accessToken);
    }

    const roleRoute = async (data) => {
        const role = data?.roles[0];
        const userId = data?.id;
        if (role === 'ADMIN') {
            const defaultBranch = branches[0];
            localStorage.setItem('branch_info', JSON.stringify(defaultBranch));
            navigate('/admin');
        } else if (role === 'NON_ADMIN') {
            try {
                const branchInfo = await getBranchByUserId(userId);
                localStorage.setItem('branch_info', JSON.stringify(branchInfo.data));
                navigate('/admin');
            } catch (error) {
                AlertUtils.error(error);
            }
        } else if (role === 'EMPLOYEE') {
            try {
                localStorage.setItem('branch_info', JSON.stringify(data?.branch));
                navigate('/admin');
            } catch (error) {
                AlertUtils.error(error);
            }
        } else {
            navigate('/home');
        }
        navigate(0);
    };


    const syncCartWithServer = async (data) => {
        if (cartTemp) {
            const request = cartTemp.map(({ id, ...rest }) => rest);
            console.log(request, data?.info?.id);
            await asyncCartService(request, data?.info?.id);
        }
        localStorage.removeItem('cart_temps');
        setTimeout(() => {
            roleRoute(data?.info);
        }, 200);
    }

    const handleSuccess = async (response) => {
        const credential = response.credential;
        const userProfile = await getEmailInfo(credential);
        const request = {
            googleId: userProfile.sub,
            email: userProfile.email,
            name: userProfile.name,
            picture: userProfile.picture
        };
        try {
            const response = await loginGoogleService(request);
            if (response?.status) {
                AlertUtils.success('Đăng nhập thành công');
                saveLocalAndCookie(response?.data);
                syncCartWithServer(response?.data);
            }
        } catch (error) {
            AlertUtils.error(error);
        }
    };

    const handleError = () => {
        AlertUtils.error('Google Login Failed');
    };

    const getEmailInfo = async (token) => {
        const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
        return await res.json();
    };

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
                        <GoogleOAuthProvider
                            clientId="667969808008-a4rid9kmarq9t44ukj0sjmgc25po8cio.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                scope="profile email" />
                        </GoogleOAuthProvider>
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
                        src="src/assets/img/quote.jpg"
                        alt="Login Illustration"
                        className="img-fluid rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
