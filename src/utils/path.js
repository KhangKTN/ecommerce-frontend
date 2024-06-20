const path = {
    // Public
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    REGISTER: 'register',
    COMPLETE_REGISTER: 'complete-register/:success',
    FORGOT_PASSWORD: 'forgot-password',
    PRODUCTS: 'products',
    BLOGS: 'blogs',
    DETAIL_BLOG: 'blog/:name/:id',
    OUR_SERVICES: 'services',
    FAQ: 'faq',
    DETAIL_PRODUCT: ':category/:id/:name',
    CATEGORY: ':category',

    // Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCT: 'manage-product',
    CREATE_PRODUCT: 'create-product',
    MANAGE_ORDER: 'manage-order',
    CREATE_BLOG: 'create-blog',
    MANAGE_BLOG: 'manage-blog',

    // Member
    ACCOUNT: 'account',
    PROFILE: 'profile',
    CART: 'cart',
    SECURITY: 'change-password',
    CHECKOUT: 'checkout'
}

export default path