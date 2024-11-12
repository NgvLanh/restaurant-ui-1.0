import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserService } from "../services/AuthService/AuthService";
import AlertUtils from "../utils/AlertUtils";

const ProtectRoute = ({ element, admin = true }) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const navigate = useNavigate();

    useEffect(() => {
        routerRole();
    }, []);

    const routerRole = async () => {
        if (!userInfo && admin) {
            navigate('/login');
            AlertUtils.info('Quyền truy cập bị từ chối!', 'Không đủ quyền hạn');
        } else if (userInfo && admin) {
            try {
                const introspect = await getUserService();
                if (introspect.roles[0] !== 'ADMIN' && introspect.roles[0] !== 'NON_ADMIN') {
                    navigate('/login');
                    AlertUtils.info('Quyền truy cập bị từ chối!', 'Không đủ quyền hạn');
                }
            } catch (error) {
                navigate('/login');
                AlertUtils.info('Quyền truy cập bị từ chối!', 'Không đủ quyền hạn');
            }
        } else if (userInfo && !admin) {
            navigate('/home');
        }
    };

    return element;
};

export default ProtectRoute;
