import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllBranches } from "../../../services/BranchService/BranchService";
import SelectTableReservation from "../SelectTableReservation/SelectTableReservation";

const Reservation = () => {
    const [branches, setBranches] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [dataRequest, setDataRequest] = useState();

    useEffect(() => {
        fetchBranch();
    }, []);

    const fetchBranch = async () => {
        setBranches(await getAllBranches());
    };

    const onSubmit = (data) => {
        setShowModal(true)
        setDataRequest(data);
        // Thực hiện logic gửi dữ liệu lên server hoặc các hành động khác
    };

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container quote px-lg-0">
                <div className="row g-0 mx-lg-5">
                    <div className="col-lg-6 ps-lg-0 wow fadeIn" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <img className="position-absolute img-fluid w-100 h-100" src="src/assets/img/quote.jpg" style={{ objectFit: 'cover' }} alt="Restaurant Dining" />
                        </div>
                    </div>
                    <div className="col-lg-6 quote-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Đặt Bàn Tại Nhà Hàng</h1>
                            </div>
                            <p className="mb-4 pb-2">Vui lòng điền thông tin bên dưới để đặt bàn. Chúng tôi sẽ xác nhận thông tin đặt bàn của bạn sớm nhất có thể.</p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6">
                                        <select className="form-select border-0" {...register("branch", { required: "Vui lòng chọn chi nhánh" })} style={{ height: '55px' }}>
                                            <option value="">Chọn chi nhánh</option>
                                            {branches?.map((branch) => (
                                                <option key={branch.id} value={branch.id}>{branch.name}</option>
                                            ))}
                                        </select>
                                        {errors.branch && <span className="text-danger">{errors.branch.message}</span>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="text" className="form-control border-0" placeholder="Tên Của Bạn" {...register("name", { required: "Vui lòng nhập tên của bạn" })} style={{ height: '55px' }} />
                                        {errors.name && <span className="text-danger">{errors.name.message}</span>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="email" className="form-control border-0" placeholder="Email Của Bạn" {...register("email", { required: "Vui lòng nhập email của bạn", pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" } })} style={{ height: '55px' }} />
                                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="text" className="form-control border-0" placeholder="Số Điện Thoại" {...register("phone", { required: "Vui lòng nhập số điện thoại của bạn" })} style={{ height: '55px' }} />
                                        {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="datetime-local" className="form-control border-0" {...register("time", { required: "Vui lòng chọn ngày đặt bàn" })} style={{ height: '55px' }} />
                                        {errors.time && <span className="text-danger">{errors.time.message}</span>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <select className="form-select border-0" {...register("seats", { required: "Vui lòng chọn số lượng người" })} style={{ height: '55px' }}>
                                            <option value="">Chọn Số Lượng Người</option>
                                            {[...Array(8)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1} Người</option>
                                            ))}
                                        </select>
                                        {errors.seats && <span className="text-danger">{errors.seats.message}</span>}
                                    </div>
                                    <div className="col-12">
                                        <textarea className="form-control border-0" placeholder="Yêu Cầu Đặc Biệt (nếu có)" {...register("notes")}></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3"
                                            type="submit">Đặt Bàn</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <SelectTableReservation
                showModal={showModal}
                handleClose={() => setShowModal(false)}
                dataRequest={dataRequest}
            />
        </div>
    );
};

export default Reservation;
