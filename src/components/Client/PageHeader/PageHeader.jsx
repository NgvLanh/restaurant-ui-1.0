import { Link } from "react-router-dom";

const PageHeader = (props) => {
    return (
        <div className="container-fluid page-header py-5 mb-5">
            <div className="container py-5">
                <h1 className="display-3 text-white mb-3 animated slideInDown">{props?.title}</h1>
                <nav aria-label="breadcrumb" className="animated slideInDown">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home" className="text-white">Trang Chủ</Link>
                        </li>
                        <li className="breadcrumb-item text-white active" aria-current="page">{props?.title}</li>
                    </ol>
                </nav>
            </div>
        </div>
    );
};

export default PageHeader;
