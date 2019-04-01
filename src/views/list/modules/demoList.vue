<template>
	<a-modal title="修改" :width="640" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
		这里放表格或者表单
	</a-modal>
</template>

<script>
export default {
	name: 'demoList',
	data(){
		return {
			visible:false,
			confirmLoading:false
		}
	},
	methods:{
		add(){
			this.visible = true
		},
		handleCancel (e) {
			this.visible = false
		},
		handleOk(e){
			this.confirmLoading = false	
		},
		showModal () {
			this.visible = true
		}
	}
}
</script>