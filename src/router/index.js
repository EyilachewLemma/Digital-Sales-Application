import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'PageContainer',
        component: () =>
            import ( /* webpackChunkName: "PageContainer" */ '../views/PageContainer.vue'),
        children: [{
                path: '/',
                name: 'Home',
                component: () =>
                    import ( /* webpackChunkName: "Home" */ '../views/HomePage.vue')
            },

            {
                path: '/category/:id',
                name: 'SolarCategory',
                props: true,
                component: () =>
                    import ( /* webpackChunkName: "SolarCategory" */ '../views/ProductList.vue')
            },
            {
                path: '/product-detail/:productId',
                name: 'ProductDetail',
                props: true,
                component: () =>
                    import ( /* webpackChunkName: "ProductDetail" */ '../views/ProductDetail.vue')
            },
            {
                path: '/store-locatore',
                name: 'StoreLocator',
                component: () =>
                    import ( /* webpackChunkName: "StoreLocator" */ '../views/StoreLocator.vue')
            },
            {
                path: '/check-out',
                name: 'CheckoutPage',
                component: () =>
                    import ( /* webpackChunkName: "CheckoutPage" */ '../views/CheckoutPage.vue')
            },
            {
                path: '/order-confirmation',
                name: 'OrderConfirmation',
                component: () =>
                    import ( /* webpackChunkName: "OrderConfirmation" */ '../views/OrderConfirmation.vue')
            },
            {
                path: '/order-confirm',
                name: 'OrderConfirm',
                component: () =>
                    import ( /* webpackChunkName: "OrderConfirm" */ '../views/OrderConfirm.vue')
            },
            {
                path: '/my-account',
                name: 'MyAccount',
                component: () =>
                    import ( /* webpackChunkName: "MyAccount" */ '../views/MyAccount.vue'),
                children: [{
                        path: '/my-order',
                        name: 'MyOrder',
                        component: () =>
                            import ( /* webpackChunkName: "MyOrder" */ '../views/MyOrder.vue')
                    },
                    {
                        path: '/set-account',
                        name: 'SetAccount',
                        component: () =>
                            import ( /* webpackChunkName: "SetAccount" */ '../views/SetAccount.vue')
                    },
                    // {
                    //     path: '/account-setting',
                    //     name: 'AccountSetting',
                    //     component: () =>
                    //         import ( /* webpackChunkName: "AccountSetting" */ '../views/AccountSetting.vue')
                    // },
                    {
                        path: '/password',
                        name: 'ChangePassword',
                        component: () =>
                            import ( /* webpackChunkName: "ChangePassword" */ '../views/ChangePassword.vue')
                    },

                ]
            },


        ]
    },

    {
        path: '/sign-up',
        name: 'SignUp',
        component: () =>
            import ( /* webpackChunkName: "SignUp" */ '../views/SignupPage.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "Login" */ '../views/LoginPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active'
})
export default router