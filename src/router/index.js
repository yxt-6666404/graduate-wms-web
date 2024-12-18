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
            path: '/AdminIndexPage',
            name: 'AdminIndexPage',
            component: () => import('@/components/Admin/AdminIndexPage.vue'),
            children: [
                        {
                            path: '/AdminSy',
                            name: 'AdminSy',
                            meta: {
                                title: '首页'
                            },
                            component: () => import('@/components/Admin/AdminSy.vue'),
                        },
                        {
                            path: '/AdminHome',
                            name: 'AdminHome',
                            meta: {
                                title: '个人中心'
                            },
                            component: () => import('@/components/Admin/AdminHome.vue'),
                        },
                        {
                            path: '/UserMan',
                            name: 'UserMan',
                            meta: {
                                title: '用户管理'
                            },
                            component: () => import('@/components/Admin/userManage/UserMan.vue')
                        },
                        {
                            path: '/CustomerMan',
                            name: 'CustomerMan',
                            meta: {
                                title: '客户管理'
                            },
                            component: () => import('@/components/Admin/userManage/CustomerMan.vue')
                        },
                        {
                            path: '/ShopMan',
                            name: 'ShopMan',
                            meta: {
                                title: '店铺管理'
                            },
                            component: () => import('@/components/Admin/userManage/ShopMan.vue')
                        },
                        {
                            path: '/CraftmenMan',
                            name: 'CraftmenMan',
                            meta: {
                                title: '手工艺人管理'
                            },
                            component: () => import('@/components/Admin/userManage/CraftmenMan.vue')
                        },
                        {
                            path: '/SupplierMan',
                            name: 'SupplierMan',
                            meta: {
                                title: '供应商管理'
                            },
                            component: () => import('@/components/Admin/userManage/SupplierMan.vue')
                        },
                        {
                            path: '/RawMaterialsCateMan',
                            name: 'RawMaterialsCateMan',
                            meta: {
                                title: '原材料类别管理'
                            },
                            component: () => import('@/components/Admin/Catagory/RawMaterialsCateMan.vue')
                        },
                        {
                            path: '/EmCateforyMainMan',
                            name: 'EmCateforyMainMan',
                            meta: {
                                title: '刺绣元素类别管理'
                            },
                            component: () => import('@/components/Admin/Catagory/EmCateforyMainMan.vue')
                        },
                        {
                            path: '/CheckMainPage',
                            name: 'CheckMainPage',
                            meta: {
                                title: '审核中心'
                            },
                            component: () => import('@/components/Admin/Check/CheckMainPage.vue')
                        },
                        {
                            path: '/GoodCheck',
                            name: 'GoodCheck',
                            meta: {
                                title: '商品上架审批'
                            },
                            component: () => import('@/components/Admin/Check/GoodCheck.vue')
                        },
                        {
                            path: '/FamousCheck',
                            name: 'FamousCheck',
                            meta: {
                                title: '传承人/刺绣名家审批'
                            },
                            component: () => import('@/components/Admin/Check/FamousCheck.vue')
                        },
                        {
                            path: '/OtherCheck',
                            name: 'OtherCheck',
                            meta: {
                                title: '其他审批'
                            },
                            component: () => import('@/components/Admin/Check/OtherCheck.vue')
                        },
                        {
                            path: '/DataAnlysisPage',
                            name: 'DataAnlysisPage',
                            meta: {
                                title: '数据分析'
                            },
                            component: () => import('@/components/Admin/DataAnlysisPage.vue')
                        },
                        
                    ]
        }
    ]

const router = new VueRouter({
    mode: 'history',
    routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router
