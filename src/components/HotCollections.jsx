import React from 'react'
import { useSelector } from 'react-redux'
import CollectionItem from './CollectionItem'

const HotCollections = () => {
    const {categories} = useSelector(state => state.app)

    return (
        <div>
            <div className='mt-5 py-3 text-xl uppercase tracking-wider font-bold border-b-[3px] border-[#5bbcff]'>Hot Collections</div>
            <div className='grid grid-cols-3 gap-4 mt-5'>
                {categories?.map((item, index) => 
                    (item?.brand?.length > 0 && 
                        <CollectionItem key={item._id} collection={item}/>)
                )}
            </div>
        </div>
    )
}

export default HotCollections