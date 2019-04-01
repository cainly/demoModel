import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
	deleteAll: '/delete',
	saveTab:'/save'
}

export default api
// 删除
export function tabDelete (parameter) {
  return axios({
    url: api.deleteAll,
    method: 'post',
    data: parameter
  })
} 
export function saveTab(parm){
	 return axios({
    url: api.saveTab,
    method: 'post',
    data: parm
  })
}

// 用户列表
export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}
// 角色列表
export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}


// id == 0 add     post
// id != 0 update  put
// export function saveService (parameter) {
//   return axios({
//     url: api.service,
//     method: parameter.id === 0 ? 'post' : 'put',
//     data: parameter
//   })
// }

