import React, { useEffect, useState } from 'react'
import { colors, sortList } from '../utils/contants'
import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import path from '../utils/path'
import InputFields from './InputFields'
import { debounce, getObjectSearchParam } from '../utils/helpers'
import Debounce from '../hooks/Debounce'

const CustomSelectFilter = ({name, dataList, setPage, activeClick, changeActiveFilter, type = 'checkbox'}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const {category} = useParams()
    const [searchParam, setSearchParam] = useSearchParams()

    const [selected, setSelected] = useState([])
    const [isLoadFirst, setIsLoadFirst] = useState(true)
    const [price, setPrice] = useState({minPrice: '', maxPrice: ''})
    const [invalid, setInvalid] = useState({minPrice: '', maxPrice: ''})


    const handleCheck = (id) => {
        isLoadFirst && setIsLoadFirst(false)
        const isCheck = isChecked(id)
        if(!isCheck) setSelected([...selected, id])
        else{
            const newSeleted = selected.reduce((v, i) => i === id ? v : [...v, i], [])
            setSelected(newSeleted)
        }
    }

    const isChecked = (item) => {
        return selected?.some(i => i == item)
    }

    useEffect(() => {
        if(isLoadFirst){
            const queries = getObjectSearchParam(searchParam.entries())
            if(type === 'checkbox'){
                queries[name] && setSelected([...queries[name].split(',')])
            }
            else if(type === 'input'){
                queries['price[gte]'] && setPrice(prev => ({...prev, minPrice: queries['price[gte]']}))
                queries['price[lte]'] && setPrice(prev => ({...prev, minPrice: queries['price[lte]']}))
            }
            else if(type === 'option'){
                setSelected(queries[name])
            }
        }
    }, [])

    useEffect(() => {
        if(!isLoadFirst){
            setPage(0)
            const queries = getObjectSearchParam(searchParam.entries())
            if(selected.length === 0) delete queries[name]
            else queries[name] = type === 'option' ? selected : selected.join(',')
            navigate({
                pathname: `${location.pathname}`,
                search: createSearchParams({...queries}).toString()
            })
        }
    }, [selected])

    const debounceMinPrice = Debounce(price.minPrice, 500)
    const debounceMaxPrice = Debounce(price.maxPrice, 500)

    useEffect(() => {
        if(!isLoadFirst){
            setPage(0)
            const queries = getObjectSearchParam(searchParam.entries())
            queries['price[gte]'] = price.minPrice
            queries['price[lte]'] = price.maxPrice
            if(price.minPrice.length === 0) delete queries['price[gte]']
            if(price.maxPrice.length === 0) delete queries['price[lte]']
            navigate({
                pathname: `${location.pathname}`,
                search: createSearchParams({...queries}).toString()
            })
        }
    }, [debounceMinPrice, debounceMaxPrice])

    useEffect(() => {
        if(price?.minPrice?.length !== 0 || price?.maxPrice?.length !== 0) isLoadFirst && setIsLoadFirst(false)
    }, [price])

    return (
        <div onClick={() => changeActiveFilter(activeClick !== name ? name : null)} className={`relative p-3 gap-x-5 border-[1px] border-main flex justify-between items-center cursor-pointer select-none rounded-md ` + (activeClick === name ? 'bg-main text-white' : 'text-gray-500')}>
            <span className='capitalize'>{name}</span>
            <i className="fa-solid fa-angle-down"></i>
            {activeClick === name &&
                <div className='absolute border border-main z-20 top-[calc(100%+2px)] left-0 bg-white shadow-lg rounded-md'>
                    {type === 'checkbox' &&
                        <>
                            <div className='p-4 text-gray-500 flex items-center justify-between font-semibold gap-x-8'>
                                <span className='whitespace-nowrap'>{selected.length} selected</span>
                                <span onClick={() => setSelected([])} className=' hover:text-red-500 cursor-pointer'>Reset</span>
                            </div>
                            <ul className='pb-4 px-2 max-h-[400px] overflow-auto'>
                                {dataList?.map(item => (
                                    <li onClick={(e) => {handleCheck(item.key); e.stopPropagation()}} key={item.key} className='py-2 px-4 hover:bg-main hover:text-white flex items-center rounded-md capitalize'>
                                        <input checked={isChecked(item.key)} id={item.key} type="checkbox" value="" className="w-4 h-4 text-main bg-gray-100 border-gray-300 rounded focus:ring-sky-500 cursor-pointer"/>
                                        <label onClick={(e) => e.stopPropagation()} htmlFor={item.key} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">{item.value}</label>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                    {type === 'input' && 
                    <>
                        <div className='p-4 text-gray-500 flex items-center justify-between font-semibold gap-x-8'>
                            <span className='whitespace-nowrap'>{selected?.length} selected</span>
                            <span onClick={() => setPrice({minPrice: '', maxPrice: ''})} className='hover:text-red-500 cursor-pointer'>Reset</span>
                        </div>
                        <div className='flex gap-x-5 px-5 py-3 min-w-[500px]' onClick={e => e.stopPropagation()}>
                            <InputFields name='minPrice' type='text' value={price} setValue={setPrice} invalid={invalid} setInvalid={setInvalid} autoFocus={true} placeHolder='Min Price'/>
                            <InputFields name='maxPrice' type='text' value={price} setValue={setPrice} invalid={invalid} setInvalid={setInvalid} autoFocus={true} placeHolder='Max Price'/>
                        </div>
                    </>
                    }
                    {type === 'option' && 
                        <>
                            <ul className='p-2 text-gray-500 text-nowrap shadow-lg'>
                                {dataList?.map(item => (
                                    <li onClick={() => {setSelected(item.key); setIsLoadFirst(0)}} key={item.key} className='py-2 px-3 rounded hover:bg-main hover:text-white group'>
                                        <span className='min-w-[150px] inline-block'>{item.value}</span> 
                                        {selected === item.key && <i className="fa-solid fa-check mr-2 font-extrabold text-main group-hover:text-white"></i>}
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default CustomSelectFilter