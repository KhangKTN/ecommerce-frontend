import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({ page, maxPage, setPage, isLoadFirst, setLoadFirst }) => {
    return (
        <ReactPaginate
            breakLabel='...'
            nextLabel={
                <>
                    Next<i className='fa-solid fa-angle-right ml-2'></i>
                </>
            }
            onPageChange={(e) => {
                setPage(e.selected)
                isLoadFirst && setLoadFirst(false)
            }}
            pageRangeDisplayed={2}
            pageCount={maxPage}
            forcePage={page < 0 ? 1 : page}
            previousLabel={
                <>
                    <i className='fa-solid fa-angle-left mr-2'></i>Prev
                </>
            }
            renderOnZeroPageCount={null}
            previousClassName='rounded-md hover:bg-gray-100 hover:text-main'
            previousLinkClassName='h-12 w-18 px-4 py-2 block flex items-center justify-center'
            pageClassName='size-12 text-gray-500 rounded-full hover:bg-gray-100 hover:text-main'
            pageLinkClassName='size-full flex items-center justify-center'
            nextClassName='rounded-md hover:bg-gray-100 hover:text-main'
            nextLinkClassName='h-12 w-18 px-4 py-2 block flex items-center justify-center font-semibold'
            containerClassName='flex items-center w-fit mt-12 mx-auto'
            activeClassName='bg-main rounded-full shadow-lg text-white hover:bg-main hover:text-white'
            disabledLinkClassName='cursor-not-allowed text-gray-300'
        />
    )
}

export default Pagination
