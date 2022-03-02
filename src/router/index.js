import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: '主页',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' }
      }
    ]
  },
  // 权限管理
  {
    path: '/authority ',
    component: Layout,
    redirect: '/authority/account',
    name: 'Authority ',
    alwaysShow: true, // 当子路由只有一个时候,也让他展开
    meta: { title: '权限管理', icon: 'el-icon-lock' }, // 设置侧边标题 图标
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/authority/account/index'),
        meta: { title: '账号管理', icon: 'el-icon-s-help' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/authority/role/index'),
        meta: { title: '角色管理', icon: 'el-icon-s-custom' }
      },
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('@/views/authority/resource/index'),
        meta: { title: '资源管理', icon: 'el-icon-files' }
      }
    ]
  },
  // 内容管理
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    alwaysShow: true, // 当子路由只有一个时候,也让他展开
    meta: { title: '内容管理', icon: 'el-icon-folder' }, // 设置侧边标题 图标
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/content/article/index'),
        meta: { title: '文章管理', icon: 'el-icon-document' }
      },
      {
        path: 'article/addArticle',
        name: 'AddArticle',
        hidden: true, // 不在侧边栏显示
        component: () => import('@/views/content/article/addArticle/index'),
        meta: { title: '新增文章', icon: 'el-icon-document-add',
          activeMenu: '/content/article' }// ⚡触发左侧目录高亮路由
      }, {
        path: 'article/editAticle',
        name: 'EditAticle',
        hidden: true, // 不在侧边栏显示
        component: () => import('@/views/content/article/addArticle/index'),
        meta: { title: '编辑文章', icon: 'el-icon-edit',
          activeMenu: '/content/article' }
      },
      {
        path: 'material',
        name: 'Material',
        component: () => import('@/views/content/material/index'),
        meta: { title: '素材列表', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  // 商品管理
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'product',
    alwaysShow: true, // 当子路由只有一个时候,也让他展开
    meta: { title: '商品管理', icon: 'el-icon-s-shop' }, // 设置侧边标题 图标
    children: [

      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/product/list/index'),
        meta: { title: '商品列表', icon: 'el-icon-shopping-bag-2' }
      },
      {
        path: 'list/addProduct',
        name: 'AddProduct',
        hidden: true, // 不在侧边栏显示
        component: () => import('@/views/product/list/addProduct/index'),
        meta: { title: '新增商品', icon: 'el-icon-shopping-bag-2',
          activeMenu: '/product/list' }
      }, {
        path: 'list/editProduct',
        name: 'EditProduct',
        hidden: true, // 不在侧边栏显示
        component: () => import('@/views/product/list/addProduct/index'),
        meta: { title: '编辑商品', icon: 'el-icon-edit',
          activeMenu: '/product/list' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/product/category/index'),
        meta: { title: '商品分类', icon: 'el-icon-menu' }
      },
      {
        path: 'brand',
        name: 'Brand',
        component: () => import('@/views/product/brand/index'),
        meta: { title: '品牌管理', icon: 'el-icon-present' }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderList',
    name: 'Order',
    alwaysShow: true, // 当子路由只有一个时候,也让他展开
    meta: { title: '订单管理', icon: 'el-icon-tickets' }, // 设置侧边标题 图标
    children: [
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/order/orderList/index'),
        meta: { title: '订单列表', icon: 'el-icon-document-checked' }
      },
      {
        path: 'orderBack',
        name: 'OrderBack',
        component: () => import('@/views/order/orderBack/index'),
        meta: { title: '退单列表', icon: 'el-icon-document-delete' }
      }, {
        path: 'address',
        name: 'Address',
        component: () => import('@/views/order/address/index'),
        meta: { title: '地址管理', icon: 'el-icon-school' }
      }
    ]
  },
  // 营销管理
  {
    path: '/market',
    component: Layout,
    redirect: '/market/activity',
    name: 'Market',
    alwaysShow: true, // 当子路由只有一个时候,也让他展开
    meta: { title: '营销管理', icon: 'el-icon-goods' }, // 设置侧边标题 图标
    children: [
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/market/activity/index'),
        meta: { title: '限时活动', icon: 'el-icon-timer' }
      },
      {
        path: 'advertising',
        name: 'Advertising',
        component: () => import('@/views/market/advertising/index'),
        meta: { title: '广告列表', icon: 'el-icon-document-copy' }
      }
    ]
  },
  // 个人中心
  {
    path: '/center',
    component: Layout,
    redirect: '/center/main',
    name: 'Center',
    alwaysShow: true, // 当子路由只有一个时候,也让他展开
    meta: { title: '个人中心', icon: 'el-icon-user-solid' }, // 设置侧边标题 图标
    children: [
      {
        path: 'main',
        name: 'Main',
        component: () => import('@/views/center/main/index'),
        meta: { title: '个人主页', icon: 'el-icon-user' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/center/setting/index'),
        meta: { title: '个人设置', icon: 'el-icon-setting' }
      }
    ]
  },
  // 注册用户管理
  {
    path: '/register',
    component: Layout,
    redirect: '/register/user',
    name: 'Register',
    alwaysShow: true, // 当子路由只有一个时候,也让他展开
    meta: { title: '注册用户管理', icon: 'el-icon-monitor' }, // 设置侧边标题 图标
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/register/user/index'),
        meta: { title: '用户列表', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
