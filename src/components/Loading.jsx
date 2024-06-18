import React from 'react'
import {SyncLoader} from 'react-spinners'

const Loading = () => {
    return (
        <div className='w-fit mx-auto mt-10'>
            <SyncLoader color='rgb(91, 188, 255)'/>
        </div>
    )
}

export default Loading