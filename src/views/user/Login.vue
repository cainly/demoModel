<template>
  <div class="main">
	<h3><span>登录</span></h3>
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
		<a-form-item>
			<a-input size="large" type="text" placeholder="帐户名或邮箱地址 / admin"
				v-decorator="[
					'username',{
						rules: [
							{ required: true, message: '请输入帐户名或邮箱地址' }, 
							{ validator: handleUsernameOrEmail }
						], 
						validateTrigger: 'change'
					}
				]"
			>
				<a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
			</a-input>
		</a-form-item>
		<a-form-item>
			<a-input size="large" type="password" autocomplete="false" placeholder="密码 / admin"
				v-decorator="[
					'password',{
						rules: [{ required: true, message: '请输入密码' }], 
						validateTrigger: 'blur'
					}
				]"
			>
				<a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
			</a-input>
		</a-form-item>
		<a-form-item>
        	<a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
        	<router-link class="forge-password" style="float: right;"
				:to="{ name: 'recover', params: { user: 'aaa'} }"
			>忘记密码</router-link>
      	</a-form-item>
		<a-form-item style="margin-top:24px">
        	<a-button size="large" type="primary" htmlType="submit" class="login-button"
          		:loading="state.loginBtn"
          		:disabled="state.loginBtn"
        	>确定</a-button>
      	</a-form-item>
		<div class="user-login-other">
			<router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
		</div>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getSmsCaptcha } from '@/api/login'
export default {
  components: {
    //TwoStepCaptcha
  },
  data () {
    return {
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
    // get2step({ })
    //   .then(res => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
	//this.requiredTwoStepCaptcha = true
	
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this
      state.loginBtn = true
      const validateFieldsKey = ['username', 'password']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.password = md5(values.password)
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      console.log(res)
      this.$router.push({ name: 'list' })
      // 延迟 1 秒显示欢迎信息
    //   setTimeout(() => {
    //     this.$notification.success({
    //       message: '欢迎',
    //       description: `${timeFix()}，欢迎回来`
    //     })
    //   }, 1000)
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main{
	h3{
		font-size: 16px;
    	margin-bottom: 20px;
	}
}
.user-layout-login {
  label {
    font-size: 14px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
  .forge-password {
    font-size: 14px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;
    
    .register {
      float: right;
    }
  }
}
</style>