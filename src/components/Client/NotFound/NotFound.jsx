import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                        <h1 className="display-1">404</h1>
                        <h1 className="mb-4">Không Tìm Thấy Trang</h1>
                        <p className="mb-4">
                            Chúng tôi xin lỗi, trang bạn đang tìm kiếm không tồn tại! Bạn có thể quay lại trang chủ hoặc thử sử dụng chức năng tìm kiếm.
                        </p>
                        <Link className="btn btn-primary py-3 px-5" to="/">
                            Quay Lại Trang Chủ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
