/**
 * @file 路由定义
 * @author
 */

export default [{
    path: '/customerList',
    name: 'customerList',
    component: resolve =>
    require.ensure(['../views/customer/customerList'], () => resolve(require('@/views/customer/customerList')))
}, {
    path: '/customerInit',
    name: 'customerInit',
    component: resolve =>
        require.ensure(['../views/customer/customerInit'], () => resolve(require('@/views/customer/customerInit')))
}, {
    path: '/hello',
    name: 'Hello',
    component: resolve => require.ensure(['../components/Hello'], () => resolve(require('@/components/Hello')))
}, {
    path: '/list',
    name: 'List',
    component: resolve => require.ensure(['../components/list'], () => resolve(require('@/components/list')))
}];
