<template>
  <a-modal title="添加" :width="640" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', {rules: [{required: true, min: 0, message: '请输入名称！'}]}]" />
        </a-form-item>
				<a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['desc', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
        </a-form-item>
					<a-form-item label="服务器调用次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['callNo', {rules: [{required: true, min: 1,max:10, message: '请输入至少一位数字'}]}]" />
        </a-form-item>
          <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="['target', {initialValue: 1, rules: [{required: true}]}]" style="width: 100%">
              <a-select-option :value="0">关闭</a-select-option>
              <a-select-option :value="1">运行中</a-select-option>
							<a-select-option :value="2">已上线</a-select-option>
							<a-select-option :value="3">异常</a-select-option>
            </a-select>
          </a-form-item>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
	beforeCreate(){
		this.form =this.$form.createForm(this);
	},
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit (e) {
			  e.preventDefault();
				this.confirmLoading = true
				this.form.validateFields((errors, values) => {
					if (!errors) {
						this.confirmLoading = false;
						console.log(values)
						saveTab(values)
							.then((res) => {
								if(res.resultCode == 0){
									form.resetFields();
									this.visible = false;
									this.confirmLoading = false;
									this.$refs.table.refresh()
								}
							})
							.catch(err => {
								
							})
					}else{
						
					}
					 
				})
    },
    handleCancel () {
      this.visible = false
    },
		
  }
}
</script>
