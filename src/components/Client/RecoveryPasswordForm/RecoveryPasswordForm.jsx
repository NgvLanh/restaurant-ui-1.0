import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AlertUtils from '../../../utils/AlertUtils';
import { useState } from 'react';
import { sendRecoveryCode } from '../../../services/MailService/MailService';
import { passwordRecoveryVerifyCode, resetPassword } from '../../../services/UserService/UserService';

const RecoveryPasswordForm = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const onSubmitEmail = async (data) => {
        sendEmail(data);
    };

    const onSubmitCode = async (data) => {
        const request = {
            otp: data.code,
            email: data.to
        }
        const response = await passwordRecoveryVerifyCode(request);
        if (response.status) {
            AlertUtils.success('Xác nhận mã thành công! Bạn có thể tiếp tục.');
            setShowPasswordResetForm(true);
        } else if (response) {
            AlertUtils.error(response?.message);
        } else {
            AlertUtils.error('Xác thực mã lỗi, vui lòng thử lại.');
        }
    };

    const onSubmitNewPassword = async (data) => {
        const request = {
            email,
            newPassword: data.newPassword
        };
        const response = await resetPassword(request);
        if (response.status) {
            AlertUtils.success('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới.');
            navigate('/login');
        } else {
            AlertUtils.error(response?.message || 'Đặt lại mật khẩu thất bại, vui lòng thử lại.');
        }
    };

    const reSend = () => {
        sendEmail({ to: email });
    };

    const sendEmail = async (data) => {
        document.getElementById('spinner').classList.add('show');
        const response = await sendRecoveryCode(data);
        if (response.status) {
            setEmail(data.to);
            AlertUtils.success('Mã khôi phục đã được gửi đến email của bạn.');
            setShowCodeInput(true);
        } else {
            AlertUtils.error(response?.message || 'Gửi mã khôi phục thất bại, vui lòng thử lại.');
        }
        document.getElementById('spinner').classList.remove('show');
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="section-title text-start">
                        <h1 className="display-5 mb-4">Khôi phục mật khẩu</h1>
                    </div>

                    {/* Form Gửi Mã */}
                    {!showCodeInput && !showPasswordResetForm && (
                        <form onSubmit={handleSubmit(onSubmitEmail)} className="w-100">
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email của bạn"
                                        {...register("to", {
                                            required: "Vui lòng nhập email",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Email không hợp lệ"
                                            }
                                        })}
                                    />
                                    <label htmlFor="email">Email của bạn</label>
                                    {errors.to && <p className="text-danger mt-2">{errors.to.message}</p>}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Gửi mã khôi phục</button>
                        </form>
                    )}

                    {/* Form Nhập Mã */}
                    {showCodeInput && !showPasswordResetForm && (
                        <form onSubmit={handleSubmit(onSubmitCode)} className="w-100">
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập mã khôi phục"
                                        {...register("code", {
                                            required: "Vui lòng nhập mã khôi phục",
                                            minLength: {
                                                value: 6,
                                                message: "Mã khôi phục phải có 6 ký tự"
                                            }
                                        })}
                                    />
                                    <label htmlFor="code">Mã khôi phục</label>
                                    {errors.code && <p className="text-danger mt-2">{errors.code.message}</p>}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Xác nhận mã</button>
                        </form>
                    )}

                    {/* Form Đặt Mật Khẩu Mới */}
                    {showPasswordResetForm && (
                        <form onSubmit={handleSubmit(onSubmitNewPassword)} className="w-100">
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Mật khẩu mới"
                                        {...register("newPassword", {
                                            required: "Vui lòng nhập mật khẩu mới",
                                            minLength: {
                                                value: 6,
                                                message: "Mật khẩu phải có ít nhất 6 ký tự"
                                            }
                                        })}
                                    />
                                    <label htmlFor="newPassword">Mật khẩu mới</label>
                                    {errors.newPassword && <p className="text-danger mt-2">{errors.newPassword.message}</p>}
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Xác nhận mật khẩu"
                                        {...register("confirmPassword", {
                                            required: "Vui lòng xác nhận mật khẩu",
                                            validate: value => value === watch("newPassword") || "Mật khẩu không khớp"
                                        })}
                                    />
                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                                    {errors.confirmPassword && <p className="text-danger mt-2">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Đặt lại mật khẩu</button>
                        </form>
                    )}

                    <div className="mt-2 w-100">
                        <div className="d-flex justify-content-between align-items-center mx-2">
                            {showCodeInput && <span onClick={reSend}>Gửi lại mã?</span>}
                            <Link to="/login">Quay về đăng nhập</Link>
                        </div>
                    </div>
                </div>

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

export default RecoveryPasswordForm;
