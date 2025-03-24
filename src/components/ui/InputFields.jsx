import React, { useState } from 'react'

const InputFields = ({className, name, type, value, setValue, invalid, setInvalid, placeHolder, isPassword, autoFocus}) => {
    const [isFocus, setIsFocus] = useState(false)
    const [isShowPw, setIsShowPw] = useState(false)

    const [typeInput, setTypeInput] = useState(type)

    const handleOnchange = (e) => {
        const valueInput = e.target.value
        if(name.toLowerCase().includes('price')) setValue(prev => ({...prev, [name]: valueInput.replace(/[^0-9]/g, "")}))
        else setValue(prev => ({...prev, [name]: valueInput}))
        setInvalid(prev => ({...prev, [name]: ''}))
       /*  if(valueInput){
            if(name === 'email' && !checkMail(valueInput)){
                setInvalid(prev => ({...prev, [name]: 'Email address is not valid!'}))
            }
            if(name === 'mobile' && !checkPhoneNumber(valueInput)){
                setInvalid(prev => ({...prev, [name]: 'Phone number is not valid!'}))
            }
            if(name.includes('name') && !checkName(valueInput)){
                setInvalid(prev => ({...prev, [name]: 'Name is not valid!'}))
            }
            // if(name.includes('password') && !checkPassword(valueInput)){
            //     setInvalid(prev => ({...prev, [name]: 'Must be includes least one number, one lowercase letter, one uppercase letter, one special character, no space!'}))
            // }
            if(name.toLowerCase().includes('price') && valueInput < 0){
                setInvalid(prev => ({...prev, [name]: 'Price must be > 0'}))
            }
        } */
    }

    const getValue = () => {
        if(name.toLowerCase().includes('price')){
            return value[name] ? parseInt(value[name]).toLocaleString('vi-VN') : ''
        }
        return value[name]
    }

    return (
        <div>
            <div className='relative'>
                <input
                    autoFocus={autoFocus}
                    onFocus={() => setIsFocus(true)} onBlur={() => {!value[name] && setIsFocus(false)}}
                    className='appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-300 focus:ring-2 focus:ring-sky-300 rounded-lg py-3 px-3 leading-tight focus:outline-none'
                    onChange={handleOnchange} value={getValue()} name={name} type={typeInput}
                    id={name}
                />
                <label
                    htmlFor={name}
                    className={`absolute cursor-text bg-white top-0 transition-all duration-300 ` + (isFocus ? '-translate-y-1/2 left-2 text-main px-2 text-sm' : 'left-3 translate-y-1/2 text-slate-400')} htmlFor={[name]}
                >
                    {placeHolder}
                </label>
                {isPassword &&
                    <span
                        onClick={() => {setIsShowPw(!isShowPw); setTypeInput(typeInput === 'text' ? 'password' : 'text')}}
                        className="absolute top-1/2 bottom-0 right-5 -translate-y-1/2 cursor-pointer"
                    >
                        <i className={'fa-solid ' + (isShowPw ? 'fa-eye' : 'fa-eye-low-vision')}></i>
                    </span>
                }
            </div>
            {invalid && <h1 className='text-red-500 text-sm mt-2'>{invalid[name]}</h1>}
        </div>
    )
}

export default InputFields
