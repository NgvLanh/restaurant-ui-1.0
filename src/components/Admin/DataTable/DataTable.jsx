import React from 'react';
import { Table, Button, Dropdown, Form, Badge } from 'react-bootstrap';
import { BiChevronDown, BiDownload, BiPlus, BiSearch, BiUpload } from 'react-icons/bi';

const DataTable = ({
    columns,
    data,
    onSort,
    onSearch,
    actions,
    onAdd,
    onImport,
    onExport }) => {

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
                <Form.Control
                    type="text"
                    placeholder="Tìm kiếm theo tên"
                    onChange={(e) => onSearch(e.target.value)}
                    className="max-w-sm"
                />
                <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" className="d-flex align-items-center">
                        <span className="d-none d-sm-inline">Danh mục</span>
                        <BiChevronDown className="ml-2" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={onAdd}>
                            <BiPlus size={16} className="mr-2" /> Thêm
                        </Dropdown.Item>
                        <Dropdown.Item onClick={onImport}>
                            <BiUpload size={16} className="mr-2" /> Import
                        </Dropdown.Item>
                        <Dropdown.Item onClick={onExport}>
                            <BiDownload size={16} className="mr-2" /> Export
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="text-black cursor-pointer" onClick={() => onSort(col.key)}>
                                <div className="d-flex justify-content-between align-items-center">
                                    {col.label}
                                    {col.searchable && (
                                        <Dropdown>
                                            <Dropdown.Toggle as="span">
                                                <BiSearch size={16} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={`Search ${col.label}`}
                                                    onChange={(e) => onSearch(col.key, e.target.value)}
                                                />
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )}
                                </div>
                            </th>
                        ))}
                        {actions && <th className="text-center">Tuỳ chọn</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data?.map((item, index) => (
                        <tr key={item.id || index}>
                            {columns.map((col, idx) => (
                                <td key={idx}>
                                    {
                                        // branch-status
                                        col.key === 'colorCode' ? (
                                            <span className='py-2 px-5 rounded-3'
                                                style={{ backgroundColor: item[col.key] }}>
                                                {/* {item[col.key]} */}
                                            </span>
                                        ) :
                                            // branch
                                            col.key === 'wardName' ? item.wardName :
                                                col.key === 'districtName' ? item.districtName :
                                                    col.key === 'provinceName' ? item.provinceName :
                                                        col.key === 'branchStatus' ? item.branchStatus?.name :
                                                            item[col.key]
                                    }
                                </td>
                            ))}
                            {actions && (
                                <td className="text-center">
                                    {actions.map((action, idx) => (
                                        <Button key={idx}
                                            variant='primary'
                                            className='border mx-1 rounded-3'
                                            onClick={() => action.onClick(item)}>
                                            {action.icon} {action.label}
                                        </Button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center text-muted">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;
