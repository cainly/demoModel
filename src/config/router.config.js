// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
	{
		path: '/',
		name: 'index',
		component: BasicLayout,
		meta: {
			title: '首页'
		},
		redirect: '/list/table-list',
		children: [
	
		// list 表格模块
		{
			path: '/list',
			name: 'list',
			component: PageView,
			redirect: '/list/table-list',
			meta: {
				title: '模版页',
				icon: 'table',
				permission: ['table']
			},
			children: [{
				path: '/list/table-list',
				name: 'TableListWrapper',
				component: () =>import('@/views/list/TableList'),
				meta: {
					title: '表格查询',
					keepAlive: true,
					permission: ['table']
				},
			},
			{
				path: '/list/basic-list',
				name: 'BasicList',
				component: () =>import('@/views/list/StandardList'),
				meta: {
					title: 'Tab切换',
					keepAlive: true,
					permission: ['table']
				}
			},
			{
				path: '/list/tableDemo',
				name: 'demoList',
				component: () =>import('@/views/list/demoList'),
				meta: {
					title: '表格2',
					keepAlive: true,
					permission: ['table']
				}
			},
			// {
			// 	path: '/list/card',
			// 	name: 'CardList',
			// 	component: () => import('@/views/list/CardList'),
			// 	meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
			// },
			{
				path: '/list/search',
				name: 'SearchList',
				component: () =>import('@/views/list/search/SearchLayout'),
				redirect: '/list/search/article',
				meta: {
					title: '搜索列表',
					keepAlive: true,
					permission: ['table']
				},
				children: [{
					path: '/list/search/article',
					name: 'SearchArticles',
					component: () =>import('../views/list/TableList'),
					meta: {
						title: '搜索列表（文章）',
						permission: ['table']
					}
				},
				// {
				// path: '/list/search/project',
				// name: 'SearchProjects',
				// component: () => import('../views/list/TableList'),
				// meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
				// },
				// {
				// path: '/list/search/application',
				// name: 'SearchApplications',
				// component: () => import('../views/list/TableList'),
				// meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
				// }
				]
			}]
		},
		// forms 表单模块
		{
			path: '/form',
			redirect: '/form/base-form',
			component: PageView,
			meta: {
				title: '表单页',
				icon: 'form',
				permission: ['form']
			},
			children: [{
				path: '/form/base-form',
				name: 'BaseForm',
				component: () =>import('@/views/form/BasicForm'),
				meta: {
					title: '基础表单',
					keepAlive: true,
					permission: ['form']
				}
			},
			{
				path: '/form/step-form',
				name: 'StepForm',
				component: () =>import('@/views/form/stepForm/StepForm'),
				meta: {
					title: '分步表单',
					keepAlive: true,
					permission: ['form']
				}
			},
			{
				path: '/form/advanced-form',
				name: 'AdvanceForm',
				component: () =>import('@/views/form/advancedForm/AdvancedForm'),
				meta: {
					title: '高级表单',
					keepAlive: true,
					permission: ['form']
				}
			}]
		},
		// profile 详情模块
		{
			path: '/profile',
			name: 'profile',
			component: RouteView,
			redirect: '/profile/basic',
			meta: {
				title: '详情页',
				icon: 'profile',
				permission: ['profile']
			},
			children: [{
				path: '/profile/basic',
				name: 'ProfileBasic',
				component: () =>import('@/views/profile/basic/Index'),
				meta: {
					title: '基础详情页',
					permission: ['profile']
				}
			},
			{
				path: '/profile/advanced',
				name: 'ProfileAdvanced',
				component: () =>import('@/views/profile/advanced/Advanced'),
				meta: {
					title: '高级详情页',
					permission: ['profile']
				}
			}]
		},
		// dashboard
		//   {
		//     path: '/dashboard',
		//     name: 'dashboard',
		//     redirect: '/dashboard/workplace',
		//     component: PageView,
		//     meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
		//     children: [
		//       {
		//         path: '/dashboard/analysis',
		//         name: 'Analysis',
		//         component: () => import('@/views/dashboard/Analysis'),
		//         meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
		//       },
		//       // 外部链接
		//       {
		//         path: 'https://www.baidu.com/',
		//         name: 'Monitor',
		//         meta: { title: '监控页（外部）', target: '_blank' }
		//       },
		//       {
		//         path: '/dashboard/workplace',
		//         name: 'Workplace',
		//         component: () => import('@/views/dashboard/Workplace'),
		//         meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
		//       }
		//     ]
		//   },
		// result 返回的结果成功或失败
		{
			path: '/result',
			name: 'result',
			component: PageView,
			redirect: '/result/success',
			meta: {
				title: '结果页',
				icon: 'check-circle-o',
				permission: ['result']
			},
			children: [{
				path: '/result/success',
				name: 'ResultSuccess',
				component: () =>import(
				/* webpackChunkName: "result" */
				'@/views/result/Success'),
				meta: {
					title: '成功',
					keepAlive: false,
					hiddenHeaderContent: true,
					permission: ['result']
				}
			},
			{
				path: '/result/fail',
				name: 'ResultFail',
				component: () =>import(
				/* webpackChunkName: "result" */
				'@/views/result/Error'),
				meta: {
					title: '失败',
					keepAlive: false,
					hiddenHeaderContent: true,
					permission: ['result']
				}
			}]
		},
	
		// Exception 操作异常页面
		{
			path: '/exception',
			name: 'exception',
			component: RouteView,
			redirect: '/exception/403',
			meta: {
				title: '异常页',
				icon: 'warning',
				permission: ['exception']
			},
			children: [{
				path: '/exception/403',
				name: 'Exception403',
				component: () =>import(
				/* webpackChunkName: "fail" */
				'@/views/exception/403'),
				meta: {
					title: '403',
					permission: ['exception']
				}
			},
			{
				path: '/exception/404',
				name: 'Exception404',
				component: () =>import(
				/* webpackChunkName: "fail" */
				'@/views/exception/404'),
				meta: {
					title: '404',
					permission: ['exception']
				}
			},
			{
				path: '/exception/500',
				name: 'Exception500',
				component: () =>import(
				/* webpackChunkName: "fail" */
				'@/views/exception/500'),
				meta: {
					title: '500',
					permission: ['exception']
				}
			}]
		},
		// other
		{
			path: '/other',
			name: 'otherPage',
			component: PageView,
			meta: {
				title: '其他组件',
				icon: 'slack',
				permission: ['dashboard']
			},
			redirect: '/other/icon-selector',
			children: [{
				path: '/other/icon-selector',
				name: 'TestIconSelect',
				component: () =>import('@/views/other/IconSelectorView'),
				meta: {
					title: 'IconSelector',
					icon: 'tool',
					keepAlive: true,
					permission: ['dashboard']
				}
			},
			{
				path: '/other/list/tree-list',
				name: 'TreeList',
				component: () =>import('@/views/other/TreeList'),
				meta: {
					title: '树目录表格',
					icon: 'cluster',
					keepAlive: true,
					permission: ['dashboard']
				}
			},
			{
				path: '/other/list/edit-table',
				name: 'EditList',
				component: () =>import('@/views/other/TableInnerEditList'),
				meta: {
					title: '内联编辑表格',
					keepAlive: true,
					permission: ['dashboard']
				}
			},
			{
				path: '/other/list/user-list',
				name: 'UserList',
				component: () =>import('@/views/other/UserList'),
				meta: {
					title: '用户列表',
					keepAlive: true,
					permission: ['dashboard']
				}
			},
			//   {
			// 	path: '/other/list/role-list',
			// 	name: 'RoleList',
			// 	component: () => import('@/views/other/RoleList'),
			// 	meta: { title: '角色列表', keepAlive: true,permission: [ 'dashboard' ] }
			//   },
			{
				path: '/other/list/system-role',
				name: 'SystemRole',
				component: () =>import('@/views/role/RoleList'),
				meta: {
					title: '角色列表',
					keepAlive: true,
					permission: ['dashboard']
				}
			},
			{
				path: '/other/list/permission-list',
				name: 'PermissionList',
				component: () =>import('@/views/other/PermissionList'),
				meta: {
					title: '权限列表',
					keepAlive: true,
					permission: ['dashboard']
				}
			}]
		}]
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}]
	
	/**
	 * 基础路由
	 * 免登录的页面记得添加到白名单 whiteList 里
	 * @type { *[] }
	 */
	export const constantRouterMap = [{
		path: '/user',
		component: UserLayout,
		redirect: '/user/login',
		hidden: true,
		children: [{
			path: 'login',
			name: 'login',
			component: () =>import('@/views/user/Login')
		},
		{
			path: 'register',
			name: 'register',
			component: () =>import('@/views/user/Register')
		},
		{
			path: 'recover',
			name: 'recover',
			component: () =>import('@/views/user/Recover')
		},
		{
			path: 'register-result',
			name: 'registerResult',
			component: () =>import('@/views/user/RegisterResult')
		}]
	},
	
	{
		path: '/test',
		component: BlankLayout,
		redirect: '/test/home',
		children: [{
			path: 'home',
			name: 'TestHome',
			component: () =>import('@/views/Home')
		}]
	}, 
	{
		path: '/404',
		component: () =>import(
		/* webpackChunkName: "fail" */
		'@/views/exception/404')
	}
]
