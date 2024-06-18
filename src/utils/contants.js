import Rating from '../components/Rating'
import path from './path'

export const linkBlog = [
    {id: 1, text: 'Latest', value: 'latest'},
    {id: 2, text: 'News Tech', value: 'news'},
    {id: 3, text: 'Review', value: 'review'},
    {id: 4, text: 'Tutorial', value: 'tutorial'},
    {id: 5, text: 'Tips & Tricks', value: 'tips'}
]

export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`
    }, 
    {
        id: 3,
        value: 'BLOGS',
        path: `/blogs`
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'faq',
        path: `/${path.FAQ}`
    }
]

export const adminSidebar = [
    {id: 1, type: 'single', text: 'Dashboard', path: `/${path.ADMIN}/${path.DASHBOARD}`, iconClassName: "fa-solid fa-gauge"},
    {id: 2, type: 'single', text: 'Users', path: `/${path.ADMIN}/${path.MANAGE_USER}`, iconClassName: "fa-solid fa-user"},
    {id: 3, type: 'single', text: 'Orders', path: `/${path.ADMIN}/${path.MANAGE_ORDER}`, iconClassName: "fa-solid fa-file-invoice-dollar"},
    {id: 4, type: 'parent', text: 'Products', iconClassName: "fa-solid fa-laptop", submenu: [{id: '41', text: 'Create product', path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`}, {id: '42', text: 'Manage product', path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`}]},
    {id: 5, type: 'parent', text: 'Blogs', iconClassName: "fa-solid fa-book", submenu: [{id: '51', text: 'Create blog', path: `/${path.ADMIN}/${path.CREATE_BLOG}`}, {id: '52', text: 'Manage blog', path: `/${path.ADMIN}/${path.MANAGE_BLOG}`}]},
    // {id: 4, type: 'single', text: 'Products', path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`, iconClassName: "fa-solid fa-laptop"},
]

export const colors = [
    {key: 'red', value: 'red'},
    {key: 'black', value: 'black'},
    {key: 'white', value: 'white'},
    {key: 'brown', value: 'brown'},
]

export const ratings = [
    {key: 2, value: <Rating rating={2}/>},
    {key: 3, value: <Rating rating={3}/>},
    {key: 4, value: <Rating rating={4}/>},
    {key: 5, value: <Rating rating={5}/>},
]

export const sortList = [
    {key: 'sort', value: '', text: 'Default'},
    {key: 'sort1', value: 'price', text: 'Price ascending'},
    {key: 'sort2', value: '-price', text: 'Price descending'},
    {key: 'sort3', value: 'name', text: 'Name A - Z'},
    {key: 'sort4', value: '-name', text: 'Name Z - A'},
    {key: 'sort5', value: '-createdAt', text: 'Latest'},
    {key: 'sort6', value: 'createdAt', text: 'Oldest'},
    {key: 'sort7', value: '-sold', text: 'Best Seller'}
]

export const memberNavLink = [
    {id: 1, text: 'Cart', path: `/${path.ACCOUNT}/${path.CART}`, icon: <i className="fa-solid fa-cart-shopping mr-3"></i>},
    {id: 2, text: 'Profile', path: `/${path.ACCOUNT}/${path.PROFILE}`, icon: <i className="fa-solid fa-circle-info mr-3"></i>},
    {id: 3, text: 'Security', path: `/${path.ACCOUNT}/${path.SECURITY}`, icon: <i className="fa-solid fa-shield mr-3"></i>}
]

