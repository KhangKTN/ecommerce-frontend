import Tippy from '@tippyjs/react'
import React, { useEffect, useRef, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'tippy.js/dist/tippy.css'
import { deleteProduct, getBrandList, getProducts } from '../../apis'
import ConfirmModal from '../../components/modal/ConfirmModal'
import Varient from '../../components/modal/Variant'
import Pagination from '../../components/pagination/Pagination'
import { CustomSelectFilter, TitleText } from '../../components/ui'
import Debounce from '../../hooks/Debounce'
import { ratings, sortList } from '../../utils/contants'
import { getFormatVND, getObjectSearchParam } from '../../utils/helpers'
import path from '../../utils/path'
import UpdateProduct from './UpdateProduct'

const ManageProduct = () => {
    const refTable = useRef()
    const navigate = useNavigate()
    const [query] = useSearchParams()

    // Search, filter
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [maxPage, setMaxPage] = useState(0)
    const [selected, setSelected] = useState([])
    const [activeFilter, setActiveFilter] = useState(null)

    // Modal
    const [showModal, setModalShow] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalVarient, setShowModalVarient] = useState(false)

    // Data render
    const [isLoadFirst, setIsLoadFirst] = useState(true)
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState(null)
    const [currentProduct, setCurrentProduct] = useState(null)

    const fetchProductList = async () => {
        const queries = getObjectSearchParam(query.entries())
        const res = await getProducts({ ...queries, limit: 10 })
        if (res.success) {
            const pageSize = Math.ceil(res.count / 10)
            setMaxPage(pageSize)
            setProductList(res.data)
        } else {
            setProductList([])
            setMaxPage(0)
        }
    }

    const fetchBrandList = async () => {
        const res = await getBrandList()
        if (res.success) setBrandList(res.data)
    }

    const handleDeleteProduct = async () => {
        let res = null
        if (currentProduct) res = await deleteProduct({ productIdList: [currentProduct?._id] })
        else res = await deleteProduct({ productIdList: selected })
        if (res.success) {
            toast.success(res.message)
            fetchProductList()
        } else {
            toast.error(res.message)
        }
    }

    const handleClickCheckbox = (id) => {
        if (selected.some((item) => item === id)) setSelected((prev) => prev.filter((item) => item !== id))
        else {
            const list = [...selected]
            list.push(id)
            setSelected(list)
        }
    }

    useEffect(() => {
        fetchBrandList()
        fetchProductList()
        refTable.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [query])

    useEffect(() => {
        if (!isLoadFirst) {
            const queries = getObjectSearchParam(query.entries())
            if (page === 0) delete queries['page']
            else queries.page = page + 1
            navigate({
                pathname: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
                search: createSearchParams({ ...queries }).toString()
            })
        }
    }, [page])

    const searchDebound = Debounce(search, 500)

    useEffect(() => {
        if (!isLoadFirst) {
            const queries = getObjectSearchParam(query.entries())
            const name = searchDebound.trim()
            if (name) {
                navigate({
                    pathname: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
                    search: createSearchParams({
                        ...queries,
                        name: name,
                        page: 1
                    }).toString()
                })
            } else {
                delete queries['name']
                navigate({
                    pathname: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
                    search: createSearchParams({ ...queries }).toString()
                })
            }
        }
    }, [searchDebound])

    return (
        <div>
            <TitleText text='Product List' />
            <div ref={refTable} className='flex justify-between items-baseline sm:rounded-lg mt-10 mb-5'>
                {/* Search product */}
                <div className='order-2 mb-0 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900'>
                    <label for='table-search' className='sr-only'>
                        Search
                    </label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
                            <svg
                                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    stroke='currentColor'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                />
                            </svg>
                        </div>
                        <input
                            type='search'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                isLoadFirst && setIsLoadFirst(false)
                            }}
                            className='block py-2 ps-10 pe-2 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-main dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Search by name...'
                        />
                    </div>
                </div>
                {/* Filter product */}
                <div className='flex gap-x-5 order-1'>
                    <CustomSelectFilter
                        name='brand'
                        dataList={brandList}
                        setPage={setPage}
                        activeClick={activeFilter}
                        changeActiveFilter={setActiveFilter}
                    />
                    <CustomSelectFilter
                        name='rating'
                        dataList={ratings}
                        setPage={setPage}
                        activeClick={activeFilter}
                        changeActiveFilter={setActiveFilter}
                    />
                    <CustomSelectFilter
                        name='Price'
                        activeClick={activeFilter}
                        setPage={setPage}
                        changeActiveFilter={setActiveFilter}
                        type='input'
                    />
                    <CustomSelectFilter
                        name='sort'
                        dataList={sortList}
                        activeClick={activeFilter}
                        setPage={setPage}
                        changeActiveFilter={setActiveFilter}
                        type='option'
                    />
                </div>
            </div>
            {/* Table list product */}
            <div className='relative overflow-x-auto rounded-md'>
                <table className='w-full text-sm text-left table-auto shadow-lg rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-sm select-none text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-3 py-4'>
                                <div className='flex items-center'>
                                    <input
                                        checked={selected.length === productList?.length && productList?.length !== 0}
                                        onClick={() =>
                                            setSelected(
                                                selected.length === productList.length
                                                    ? []
                                                    : productList?.map((item) => item._id)
                                            )
                                        }
                                        id='checkbox-all-search'
                                        type='checkbox'
                                        className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
                                    />
                                    <label for='checkbox-all-search' className='sr-only'>
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope='col' className='px-6 py-4 flex justify-between items-center cursor-pointer'>
                                <span>Thumbnail</span>
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                <span>Name</span>
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Brand
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Price
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Quantity
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Sold
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Rating
                            </th>
                            <th scope='col' className='px-6 py-4'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList?.map((item) => (
                            <tr
                                key={item._id}
                                className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 bg-white border-b text-base dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                            >
                                <td className='w-4 pl-3'>
                                    <div className='flex items-center'>
                                        <input
                                            onClick={() => handleClickCheckbox(item._id)}
                                            checked={selected?.includes(item._id)}
                                            id='checkbox-table-search-1'
                                            type='checkbox'
                                            className='w-4 h-4 border-gray-300 rounded focus:ring-0 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
                                        />
                                        <label for='checkbox-table-search-1' className='sr-only'>
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th
                                    scope='row'
                                    className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                    <img
                                        className='w-20 h-16 object-contain rounded-md'
                                        src={item.thumbnail}
                                        alt=''
                                    />
                                    <div className='ps-3'>
                                        <div className='text-base font-semibold'></div>
                                    </div>
                                </th>
                                <td className='px-6 py-4 truncate font-semibold'>{item.name}</td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center'>{item.brand}</div>
                                </td>
                                <td className='px-6 py-4 truncate'>{getFormatVND(item.price)}</td>
                                <td className='px-6 py-4'>{item.quantity}</td>
                                <td className='px-6 py-4'>{item.sold}</td>
                                <td className='px-6 py-4'>{item.totalRating}</td>
                                <td>
                                    <div className='flex gap-x-3 items-center '>
                                        <Tippy className='text-main bg-gray-700' content={<span>Edit product</span>}>
                                            <button
                                                onClick={() => {
                                                    setCurrentProduct(item)
                                                    setShowModalUpdate(true)
                                                }}
                                                className={
                                                    'px-5 py-2 rounded-lg border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                                                }
                                            >
                                                <i className='fa-solid fa-file-pen'></i>
                                            </button>
                                        </Tippy>
                                        <Tippy className='text-main bg-gray-700' content={<span>Variant product</span>}>
                                            <button
                                                onClick={() => {
                                                    setCurrentProduct(item)
                                                    setShowModalVarient(true)
                                                }}
                                                className={
                                                    'px-5 py-2 rounded-lg border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                                                }
                                            >
                                                <i className='fa-solid fa-diagram-project'></i>
                                            </button>
                                        </Tippy>
                                        <Tippy className='text-main bg-gray-700' content={<span>Delete product</span>}>
                                            <button
                                                onClick={() => {
                                                    setCurrentProduct(item)
                                                    setModalShow(true)
                                                }}
                                                className={
                                                    'px-5 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                                }
                                            >
                                                <i className='fa-regular fa-trash-can'></i>
                                            </button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} setPage={setPage} maxPage={maxPage} setIsLoadFirst={setIsLoadFirst} />
            {showModal && (
                <ConfirmModal
                    setShowModal={setModalShow}
                    setCurrent={setCurrentProduct}
                    title={'Confirm delete product'}
                    content={`Do you want delete product ${currentProduct?.name}?`}
                    handleClick={handleDeleteProduct}
                />
            )}
            {showModalUpdate && (
                <UpdateProduct
                    title='Update Product'
                    setShowModal={setShowModalUpdate}
                    product={currentProduct}
                    handleRefresh={fetchProductList}
                />
            )}
            {showModalVarient && (
                <Varient
                    product={currentProduct}
                    setShowModal={setShowModalVarient}
                    setCurrent={setCurrentProduct}
                    handleRefresh={fetchProductList}
                    title={`List variant ${currentProduct?.name}`}
                />
            )}
        </div>
    )
}

export default ManageProduct
