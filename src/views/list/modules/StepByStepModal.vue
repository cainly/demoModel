<template>
  <a-modal title="修改" :width="640" :visible="visible" :confirmLoading="confirmLoading" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
          <a-form-item label="规则名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['name', {rules: [{required: true, message: '请输入名称' }]}]" />
          </a-form-item>
          <a-form-item label="规则描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea :rows="4" v-decorator="['desc', {rules: [{required: true}]}]"></a-textarea>
          </a-form-item>
					<a-form-item label="被攻击次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
						<a-input-number v-decorator="['callNo', {rules: [{required: true, min: 1,max:10, message: '请输入至少一位的数字'}]}]" />
					</a-form-item>
          <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="['target', {initialValue: 0, rules: [{required: true}]}]" style="width: 100%">
              <a-select-option :value="0">关闭</a-select-option>
              <a-select-option :value="1">运行中</a-select-option>
							<a-select-option :value="2">已上线</a-select-option>
							<a-select-option :value="3">异常</a-select-option>
            </a-select>
          </a-form-item>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleFinish">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { setTimeout } from 'timers';
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
  name: 'StepByStepModal',
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
      mdl: {},
    }
  },
	beforeCreate() {
		this.form = this.$form.createForm(this)
	
	},
	watch:{},
  methods: {
    edit (record) {
      this.visible = true
			console.log(record)
			this.$nextTick(function(){
				this.form.setFieldsValue({
					name:record.no,
					desc: record.description,
					callNo:record.callNo
				}); 
			});
    },
    handleCancel () {
      // clear form & currentStep
      this.visible = false
    },
		handleFinish (e) {
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
			
		}
  }
}
</script>
