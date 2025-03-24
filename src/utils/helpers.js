import moment from 'moment'

export const getFormatVND = (price) => new Intl.NumberFormat('vi-VN').format(Math.ceil(price)) + ' đ'

export const getHour = (time, expireTime) => moment.duration(expireTime - time, 'milliseconds').hours()

export const getMinute = (time, expireTime) => moment.duration(expireTime - time, 'milliseconds').minutes()

export const getSecond = (time, expireTime) => moment.duration(expireTime - time, 'milliseconds').seconds()

export const checkPhoneNumber = (phone) => {
    const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g
    return phone.match(regexPhoneNumber) ? true : false
}

export const checkMail = (mail) => {
    const emailRegex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net)\b/
    return emailRegex.test(mail)
}

export const checkName = (name) => {
    const regexName = /^[a-zA-Z ]+$/
    return regexName.test(name)
}

export const checkPassword = (password) => {
    const regexName = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    return regexName.test(password)
}

export const getObjectSearchParam = (queryEntries) => {
    let queryList = []
    for (let i of queryEntries) queryList.push(i)
    const queries = {}
    for (let i of queryList) queries[i[0]] = i[1]
    return queries
}

export const getRangePrice = (variant) => {
    let minPrice = variant[0].price,
        maxPrice = variant[0].price

    variant?.forEach((item) => {
        if (item.price < minPrice) minPrice = item.price
        if (item.price > maxPrice) maxPrice = item.price
    })
    return `${getFormatVND(minPrice)} - ${getFormatVND(maxPrice)}`
}
