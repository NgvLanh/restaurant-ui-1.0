import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavGeneral = ({
    projects,
}) => {
    return (
        <div className="p-3 w-100">
            <h6 className="mb-3" style={{ fontSize: '1rem' }}>Chung</h6>
            <ListGroup variant="flush">
                {projects.map((item) => (
                    <ListGroup.Item
                        key={item.name}
                        as="li"
                        className="d-flex align-items-center border-0"
                    >
                        <Link to={item.url} className="d-flex text-secondary align-items-center text-decoration-none"
                            style={{ fontWeight: '900', fontSize: '0.9rem' }}>
                            <span className="me-2">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
