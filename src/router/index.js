// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'


Vue.use(Router)

const routes=
    [
        {
            path: '/',
            name: 'LoginPage',
            component: () => import('@/components/LoginPage.vue'),
        },
        {
            path:'/ProductDetail',
            name:'ProductDetail',
            component:()=>import('@/components/Customer/ProductDetail.vue')
        },
        {
            path: '/IndexPage',
            name: 'IndexPage',
            component: () => import('@/components/IndexPage.vue'),
            children: [
                    //     {
                    //         path: '/AdminHome',
                    //         name: 'AdminHome',
                    //         meta: {
                    //             title: '管理员个人中心'
                    //         },
                    //         component: () => import('@/components/Admin/AdminHome.vue'),
                    //     },
                    //     {
                    //         path: '/UserMan',
                    //         name: 'UserMan',
                    //         meta: {
                    //             title: '用户管理'
                    //         },
                    //         component: () => import('@/components/Admin/userManage/UserMan.vue')
                    //     },
                    //     {
                    //         path: '/CustomerMan',
                    //         name: 'CustomerMan',
                    //         meta: {
                    //             title: '客户管理'
                    //         },
                    //         component: () => import('@/components/Admin/userManage/CustomerMan.vue')
                    //     },
                    //     {
                    //         path: '/ShopMan',
                    //         name: 'ShopMan',
                    //         meta: {
                    //             title: '店铺管理'
                    //         },
                    //         component: () => import('@/components/Admin/userManage/ShopMan.vue')
                    //     },
                    //     {
                    //         path: '/CraftmenMan',
                    //         name: 'CraftmenMan',
                    //         meta: {
                    //             title: '手工艺人管理'
                    //         },
                    //         component: () => import('@/components/Admin/userManage/CraftmenMan.vue')
                    //     },
                    //     {
                    //         path: '/SupplierMan',
                    //         name: 'SupplierMan',
                    //         meta: {
                    //             title: '供应商管理'
                    //         },
                    //         component: () => import('@/components/Admin/userManage/SupplierMan.vue')
                    //     },
                    //     {
                    //         path: '/RawMaterialsCateMan',
                    //         name: 'RawMaterialsCateMan',
                    //         meta: {
                    //             title: '原材料类别管理'
                    //         },
                    //         component: () => import('@/components/Admin/Catagory/RawMaterialsCateMan.vue')
                    //     },
                    //     {
                    //         path: '/EmCateforyMainMan',
                    //         name: 'EmCateforyMainMan',
                    //         meta: {
                    //             title: '刺绣流派类别管理'
                    //         },
                    //         component: () => import('@/components/Admin/Catagory/EmCateforyMainMan.vue')
                    //     },
                    //     {
                    //         path: '/EmCateforyMainMan2',
                    //         name: 'EmCateforyMainMan2',
                    //         meta: {
                    //             title: '刺绣技法类别管理'
                    //         },
                    //         component: () => import('@/components/Admin/Catagory/EmCateforyMainMan2.vue')
                    //     },
                    //     {
                    //         path: '/EmCateforyMainMan3',
                    //         name: 'EmCateforyMainMan3',
                    //         meta: {
                    //             title: '刺绣载体类别管理'
                    //         },
                    //         component: () => import('@/components/Admin/Catagory/EmCateforyMainMan3.vue')
                    //     },
                    //     {
                    //         path: '/CheckMainPage',
                    //         name: 'CheckMainPage',
                    //         meta: {
                    //             title: '审核中心'
                    //         },
                    //         component: () => import('@/components/Admin/Check/CheckMainPage.vue')
                    //     },
                    //     {
                    //         path: '/GoodCheck',
                    //         name: 'GoodCheck',
                    //         meta: {
                    //             title: '商品上架审批'
                    //         },
                    //         component: () => import('@/components/Admin/Check/GoodCheck.vue')
                    //     },
                    //     {
                    //         path: '/FamousCheck',
                    //         name: 'FamousCheck',
                    //         meta: {
                    //             title: '传承人/刺绣名家审批'
                    //         },
                    //         component: () => import('@/components/Admin/Check/FamousCheck.vue')
                    //     },
                    //     {
                    //         path: '/OtherCheck',
                    //         name: 'OtherCheck',
                    //         meta: {
                    //             title: '其他审批'
                    //         },
                    //         component: () => import('@/components/Admin/Check/OtherCheck.vue')
                    //     },
                    //     {
                    //         path: '/DataAnlysisPage',
                    //         name: 'DataAnlysisPage',
                    //         meta: {
                    //             title: '数据分析'
                    //         },
                    //         component: () => import('@/components/Admin/DataAnlysisPage.vue')
                    //     },
                        
                        
                    //     {
                    //         path: '/RawCategoryMan',
                    //         name: 'RawCategoryMan',
                    //         meta: {
                    //             title: '供应商原材料类别管理'
                    //         },
                    //         component: () => import('@/components/Supplier/RawMan/RawCategoryMan.vue')
                    //     }, {
                    //         path: '/RawMaterialMan',
                    //         name: 'RawMaterialMan',
                    //         meta: {
                    //             title: '供应商原材料商品管理'
                    //         },
                    //         component: () => import('@/components/Supplier/RawMan/RawMaterialMan.vue')
                    //     }, {
                    //         path: '/RawDataAnlysisPage',
                    //         name: 'RawDataAnlysisPage',
                    //         meta: {
                    //             title: '数据分析'
                    //         },
                    //         component: () => import('@/components/Supplier/RawDataAnlysisPage.vue')
                    //     }, {
                    //         path: '/RawOrders',
                    //         name: 'RawOrders',
                    //         meta: {
                    //             title: '订单管理'
                    //         },
                    //         component: () => import('@/components/Supplier/RawOrders.vue')
                    //     },
                    //     {
                    //         path: '/SupplierHome',
                    //         name: 'SupplierHome',
                    //         meta: {
                    //             title: '供应商个人中心'
                    //         },
                    //         component: () => import('@/components/Supplier/SupplierHome.vue')
                    //     },
                   
                        //         path: '/SupplierHome',
                        //         name: 'SupplierHome',
                        //         meta: {
                        //             title: '供应商个人中心'
                        //         },
                        //         component: () => import('@/components/Supplier/SupplierHome.vue')
                        //     },
                        
                    ]
        },
      
    ]

const router = new VueRouter({
    mode: 'history',
    routes
})

export function resetRouter() {
    router.matcher = new VueRouter({
        mode:'history',
        routes: []
    }).matcher
}

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

// router.beforeEach((to, from, next) => {
//     if (!router.hasRoute(to.name)) {
//       // 动态添加路由
//       router.addRoute<dynamicRoute>();
//       next(to);
//     } else {
//       next();
//     }
//   });
//   const dynamicRoute = {
//     path: '/',
//     name: 'LoginPage',
//     component: () => import('@/components/LoginPage.vue'),
//   }
//   r

export default router
