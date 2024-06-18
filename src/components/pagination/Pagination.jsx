import React from 'react'
import ReactPaginate from 'react-paginate';

const Pagination = ({page, maxPage, setPage, setIsLoadFirst}) => {
    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel='Next >'
                onPageChange={(e) => {setPage(e.selected); setIsLoadFirst(false)}}
                pageRangeDisplayed={5}
                pageCount={maxPage}
                forcePage={page}
                previousLabel="< Prev"
                renderOnZeroPageCount={null}
                previousClassName="rounded-md hover:bg-gray-100 hover:text-main"
                previousLinkClassName="px-4 py-2 block"
                pageClassName="text-gray-500 rounded-full hover:bg-gray-100 hover:text-main"
                pageLinkClassName="px-4 py-2 block"
                nextClassName="rounded-md hover:bg-gray-100 hover:text-main"
                nextLinkClassName="px-4 py-2 block"
                containerClassName="flex items-center w-fit mt-10 mx-auto"
                activeClassName="bg-main rounded-full shadow-lg text-white hover:bg-main hover:text-white"
            />
        </div>
    )
}

export default Pagination