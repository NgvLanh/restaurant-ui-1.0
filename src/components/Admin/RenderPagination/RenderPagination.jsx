import { Pagination } from "react-bootstrap";

const RenderPagination = ({ currentPage, totalPages, pageSize, setCurrentPage }) => {
    return (
        <Pagination className="d-flex justify-content-center mt-4">
            <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0} />

            {totalPages > pageSize ? (
                <>
                    <Pagination.Item active={currentPage === 0} onClick={() => setCurrentPage(0)}>1</Pagination.Item>
                    {currentPage > 2 && <Pagination.Ellipsis />}
                    {currentPage > 1 && (
                        <Pagination.Item onClick={() => setCurrentPage(currentPage - 1)}>{currentPage}</Pagination.Item>
                    )}
                    {currentPage !== 0 && currentPage !== totalPages - 1 && (
                        <Pagination.Item active>{currentPage + 1}</Pagination.Item>
                    )}
                    {currentPage < totalPages - 2 && (
                        <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 2}</Pagination.Item>
                    )}
                    {currentPage < totalPages - 3 && <Pagination.Ellipsis />}
                    <Pagination.Item
                        active={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage(totalPages - 1)}
                    >
                        {totalPages}
                    </Pagination.Item>
                </>
            ) : (
                Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                        {index + 1}
                    </Pagination.Item>
                ))
            )}

            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage === totalPages - 1} />
        </Pagination>
    );
};

export default RenderPagination;
