import React from 'react';
import { Container, Row, Col, Breadcrumb, Button } from 'react-bootstrap';

const PageHeader = ({ title }) => {
    return (
        <Container fluid className="py-3 bg-light border-bottom">
            <Row>
                <Col md={12} className='d-flex align-items-center justify-content-center'>
                    <h2 className="mb-0">{title}</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default PageHeader;
