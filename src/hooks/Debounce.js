import React, { useEffect, useState } from 'react'

const Debounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState('')

    useEffect(() => {
        let timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    
    return debounceValue
}

export default Debounce