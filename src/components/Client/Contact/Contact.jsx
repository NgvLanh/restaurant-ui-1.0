import React from 'react';

const Contact = () => {
    return (
        <div className="container-fluid bg-light overflow-hidden px-lg-0" style={{ margin: '6rem 0' }}>
            <div className="container contact px-lg-0">
                <div className="row g-0 mx-lg-5">
                    <div className="col-lg-6 contact-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 ps-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Liên Hệ Với Chúng Tôi</h1>
                            </div>
                            <p className="mb-4">
                                Mẫu liên hệ hiện đang không hoạt động. Để có một mẫu liên hệ hoạt động với Ajax và PHP trong vài phút, chỉ cần sao chép và dán tệp, thêm một chút mã và hoàn tất.{' '}
                                <a href="https://htmlcodex.com/contact-form">Tải ngay</a>.
                            </p>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" placeholder="Tên Của Bạn" />
                                            <label htmlFor="name">Tên Của Bạn</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email" placeholder="Email Của Bạn" />
                                            <label htmlFor="email">Email Của Bạn</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="subject" placeholder="Chủ Đề" />
                                            <label htmlFor="subject">Chủ Đề</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Nhập tin nhắn tại đây" id="message" style={{ height: '100px' }}></textarea>
                                            <label htmlFor="message">Nội Dung</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">Gửi Tin Nhắn</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 pe-lg-0" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <iframe
                                className="position-absolute w-100 h-100"
                                style={{ objectFit: 'cover' }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                                frameBorder="0"
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
