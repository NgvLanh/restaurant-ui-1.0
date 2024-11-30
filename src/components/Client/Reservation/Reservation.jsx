import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllBranches } from "../../../services/BranchService/BranchService";
import SelectTableReservation from "../SelectTableReservation/SelectTableReservation";
import AlertUtils from "../../../utils/AlertUtils";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
    const [branches, setBranches] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [dataRequest, setDataRequest] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBranch();
    }, []);

    const fetchBranch = async () => {
        setBranches(await getAllBranches());
    };

    const onSubmit = (data) => {
        setShowModal(true)
        setDataRequest(data);
    };

    const handleChangeBranch = async (value) => {
        const branch = branches?.find(e => e.id === parseInt(value))
        localStorage.setItem('branch_info', JSON.stringify(branch));
    }

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
                                        <div className="form-floating">
                                            <select className="form-select border-0"
                                                {...register("branch", { required: "Vui lòng chọn chi nhánh" })}
                                                onChange={(e) => handleChangeBranch(e.target.value)}
                                                defaultValue={JSON.parse(localStorage.getItem('branch_info'))?.id}
                                                id="floatingBranch">
                                                {branches?.map((branch) => (
                                                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="floatingBranch">Chi Nhánh</label>
                                            {errors.branch && <span className="text-danger">{errors.branch.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control border-0" placeholder="Tên Của Bạn" {...register("fullName", { required: "Vui lòng nhập tên của bạn" })} id="floatingFullName" />
                                            <label htmlFor="floatingFullName">Tên Của Bạn</label>
                                            {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control border-0" placeholder="Email Của Bạn" {...register("email", { pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" } })} id="floatingEmail" />
                                            <label htmlFor="floatingEmail">Email Của Bạn</label>
                                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control border-0" placeholder="Số Điện Thoại" {...register("phoneNumber", { required: "Vui lòng nhập số điện thoại của bạn" })} id="floatingPhoneNumber" />
                                            <label htmlFor="floatingPhoneNumber">Số Điện Thoại</label>
                                            {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating">
                                            <input
                                                type="date"
                                                className="form-control border-0"
                                                defaultValue={new Date().toISOString().split("T")[0]}
                                                {...register("bookingDate", {
                                                    required: "Vui lòng chọn ngày đặt bàn",
                                                    validate: (value) => {
                                                        const today = new Date();
                                                        const selectedDate = new Date(value);
                                                        today.setHours(0, 0, 0, 0);
                                                        if (selectedDate < today) {
                                                            return "Ngày đặt bàn phải là hôm nay hoặc trong tương lai";
                                                        }
                                                        return true;
                                                    },
                                                })}
                                                id="floatingBookingDate"
                                            />
                                            <label htmlFor="floatingBookingDate">Ngày Đặt Bàn</label>
                                            {errors.bookingDate && <span className="text-danger">{errors.bookingDate.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating">
                                            <input
                                                type="time"
                                                className="form-control border-0"
                                                {...register("startTime", {
                                                    required: "Vui lòng chọn giờ đặt bàn",
                                                    validate: (value) => {
                                                        const [hours, minutes] = value.split(":").map(Number);
                                                        if (hours < 9 || (hours === 21 && minutes > 0) || hours > 21) {
                                                            return "Thời gian phải nằm trong khoảng 09:00 AM - 09:00 PM";
                                                        }
                                                        return true;
                                                    },
                                                })}
                                                id="floatingBookingTime"
                                            />
                                            <label htmlFor="floatingBookingTime">Giờ Đặt Bàn</label>
                                            {errors.startTime && <span className="text-danger">{errors.startTime.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control border-0" placeholder="Yêu Cầu Đặc Biệt (nếu có)" {...register("notes")} id="floatingNotes" style={{ height: '100px' }}></textarea>
                                            <label htmlFor="floatingNotes">Yêu Cầu Đặc Biệt (nếu có)</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">Đặt Bàn</button>
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
