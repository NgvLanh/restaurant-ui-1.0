import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserService } from "../services/AuthService/AuthService";
import AlertUtils from "../utils/AlertUtils";

const ProtectRoute = ({ element, admin = true }) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById('spinner').classList.add('show');
        routerRole();
        document.getElementById('spinner').classList.remove('show');
    }, []);

    const routerRole = async () => {
        console.log(admin, !userInfo);

        if (admin) {
            if (!userInfo) {
                navigate('/login');
                AlertUtils.info('Localstroge #: KO', 'Quyền truy cập bị từ chối!');
            } else {
                const introspect = await getUserService();
                if (introspect === undefined) {
                    navigate('/login');
                    AlertUtils.info('Vui lòng đăng nhập để tiếp tục!', 'Bạn chưa đăng nhập');
                } else if (introspect.roles[0] !== 'ADMIN' && introspect.roles[0] !== 'NON_ADMIN') {
                    navigate('/login');
                    AlertUtils.info('Localstroge #: CÓ, TOKEN ko phải ADMIN', 'Quyền truy cập bị từ chối!');
                }
            }
        } else {
            if (!userInfo) {
                navigate('/login');
                AlertUtils.info('Vui lòng đăng nhập để tiếp tục!', 'Bạn chưa đăng nhập');
                // } else {
                //     console.log('MỆT');

                //     // navigate('/login');
                //     // AlertUtils.info('Vui lòng đăng nhập để tiếp tục!', 'Bạn chưa đăng nhập');
            }
        }


    };

    return element;
};

export default ProtectRoute;
