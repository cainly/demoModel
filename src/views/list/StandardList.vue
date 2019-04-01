<template>
		<a-card
		style="margin-top: 24px"
		:bordered="false"
		:tabList="tabList"
		:activeTabKey="activeTabKey"
		@tabChange="(key) => {this.activeTabKey = key}"
	>
		<div  v-if="activeTabKey === '1'">
		dgsgg
		</div>
		
		<a-table
		v-if="activeTabKey === '2'"
		:columns="operationColumns"
		:dataSource="operation2"
		:pagination="false"
		>
		<template
			slot="status"
			slot-scope="status">
			<a-badge :text="status | statusFilter"/>
		</template>
		</a-table>
		<a-table
		v-if="activeTabKey === '3'"
		:columns="operationColumns"
		:dataSource="operation3"
		:pagination="false"
		>
		<template
			slot="status"
			slot-scope="status">
			<a-badge :text="status | statusFilter"/>
		</template>
		</a-table>
	</a-card>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
export default {
	name: 'StandardList',
	data () {
		return {
			tabList: [
				{
					key: '1',
					tab: '操作日志一'
				},
				{
					key: '2',
					tab: '操作日志二'
				},
				{
					key: '3',
					tab: '操作日志三'
				}
			],
			activeTabKey: '1',
			operationColumns: [
				{
					title: '操作类型',
					dataIndex: 'type',
					key: 'type'
				},
				{
					title: '操作人',
					dataIndex: 'name',
					key: 'name'
				},
				{
					title: '执行结果',
					dataIndex: 'status',
					key: 'status',
					scopedSlots: { customRender: 'status' }
				},
				{
					title: '操作时间',
					dataIndex: 'updatedAt',
					key: 'updatedAt'
				},
				{
					title: '备注',
					dataIndex: 'remark',
					key: 'remark'
				}
			],
			
			operation2: [
				{
					key: 'op2',
					type: '财务复审',
					name: '付小小',
					status: 'reject',
					updatedAt: '2017-10-03  19:23:12',
					remark: '不通过原因'
				},
				{
					key: 'op3',
					type: '部门初审',
					name: '周毛毛',
					status: 'agree',
					updatedAt: '2017-10-03  19:23:12',
					remark: '-'
				},
				{
					key: 'op4',
					type: '提交订单',
					name: '林东东',
					status: 'agree',
					updatedAt: '2017-10-03  19:23:12',
					remark: '很棒'
				}
			],
			operation3: [
				{
					key: 'op2',
					type: '财务复审',
					name: '付小小',
					status: 'reject',
					updatedAt: '2017-10-03  19:23:12',
					remark: '不通过原因'
				},
				{
					key: 'op3',
					type: '部门初审',
					name: '周毛毛',
					status: 'agree',
					updatedAt: '2017-10-03  19:23:12',
					remark: '-'
				}
			]
		}
	},
	filters: {
		statusFilter (status) {
			const statusMap = {
				'agree': '成功',
				'reject': '驳回'
			}
			return statusMap[status]
		},
		// statusTypeFilter (type) {
		// 	const statusTypeMap = {
		// 		'agree': 'success',
		// 		'reject': 'error'
		// 	}
		// 	return statusTypeMap[type]
		// }
  }
	
}
</script>

<style lang="less" scoped>
   /*这里是本页的样式*/
</style>
