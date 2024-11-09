import React, { useState } from "react";
import { Dropdown, Button, ButtonGroup, Nav } from "react-bootstrap";
import "./SidebarHeader.css"

export const SidebarHeader = ({ teams }) => {
    const [activeTeam, setActiveTeam] = useState(teams[0] || null);

    const handleActiveTeam = (team) => {
        console.log(team);
        setActiveTeam(team);
    };

    return (
        <Nav className="_sidebar_header _outline_none w-100">
            <Dropdown as={ButtonGroup} className="w-100 mb-3">
                <Dropdown.Toggle split className="d-flex align-items-center w-100 bg-white border-0 rounded-3" >
                    <div className="d-flex align-items-center justify-content-center bg-dark rounded-3"
                     style={{ width: "32px", height: "32px" }}>
                        <i className="fas fa-map"></i>
                    </div>
                    <div className="ms-2 text-start flex-grow-1 py-1">
                        <div className="_name">{activeTeam?.name}</div>
                        <small className="_branch">{activeTeam?.plan}</small>
                    </div>
                    <span className="text-dark d-flex flex-column">
                        <i className="fas fa-angle-down"></i>
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu align="start" className="border-1 rounded-3 w-100 overflow-hidden">
                    <Dropdown.Header>Chi nhánh</Dropdown.Header>
                    {teams?.map((team, index) => (
                        <Dropdown.Item
                            key={team.name}
                            onClick={() => handleActiveTeam(team)}
                            className="d-flex align-items-center justify-content-between gap-2"
                        >
                            <div className="d-flex align-items-center gap-2">
                                <div className="d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                                    <i className="fas fa-code-branch"></i>
                                </div>
                                <span className="_name_item">{team.name}</span>
                            </div>
                            <span>⌘{index + 1}</span>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    );
}
