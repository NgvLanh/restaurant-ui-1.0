import { Card } from 'react-bootstrap';
import { BsCurrencyDollar } from 'react-icons/bs';
import { formatCurrency } from '../../../utils/FormatUtils';

function OverviewCard({ title, value, subtitle }) {
    return (
        <section className='col-lg-3 col-md-4'>
            <Card className="m-1">
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title>{title}</Card.Title>
                    đ
                </Card.Header>
                <Card.Body>
                    <h3 className="display-5">{formatCurrency(value)}</h3>
                    <span>{subtitle}</span>
                </Card.Body>
            </Card>
        </section>
    );
}

export default OverviewCard;