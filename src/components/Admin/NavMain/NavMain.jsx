import React from "react";
import { Accordion, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavMain({ items }) {
    return (
        <div className="_outline_none p-3 pt-0 w-100">
            <h6 className="mb-3" style={{ fontSize: '1rem' }}>Quản lý</h6>
            <Accordion alwaysOpen className="mt-2">
                {items.map((item, index) => (
                    <Accordion.Item
                        eventKey={index.toString()}
                        key={item.title}
                        className="border-0"
                        style={{ fontWeight: '600' }}>
                        <Accordion.Header className="p-1">
                            <span className="me-2">{item.icon}</span>
                            <small className="fst-italic" style={{ letterSpacing: '0.05rem' }}>{item.title}</small>
                        </Accordion.Header>
                        <Accordion.Body className="p-0 ms-3">
                            <Nav className="flex-column my-1"
                                style={{ borderLeft: '1px solid var(--primary)', fontSize: '0.9rem' }}>
                                {item.items?.map((subItem) => (
                                    <Nav.Item key={subItem.title}>
                                        <Nav.Link as={Link} to={subItem.url}>
                                            {subItem.title}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}
