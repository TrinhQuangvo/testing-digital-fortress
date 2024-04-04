import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`${currentPage === i ? "bg-green-300 text-white" : "bg-white text-black" } border-none shadow-lg px-2 py-1 rounded-sm text-sm font-semibold`}
            >
                {i}
            </button>
        );
    }

    return <div className="flex justify-center items-center gap-4 my-4">
        {pages}
    </div>;
};

export default Pagination;
