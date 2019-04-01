<template>
	<div class="main user-layout-register">
    	<h3><span>忘记密码</span></h3>
	</div>
</template>

<script>
import { getSmsCaptcha } from '@/api/login'

export default {
  name: 'Recover',
  components: {
   
  },
  data () {
    return {
     
    }
  },
  computed: {
   
  },
  created () {
    this.user = this.$route.params
  },
  methods: {
   
  }
}
</script>

<style scoped>

</style>
