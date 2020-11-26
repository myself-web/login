<template>
  <div class="home">
    <div class="loginBox" v-if="show">
      <input type="text" placeholder="请输入账号" v-model="reg.username"><br/>
      <input type="password" placeholder="请输入密码" v-model="reg.password"><br/>
      <button @click="toLogClick">登录</button>
      <div class="toReg" @click="toReg">去注册</div>

    </div>
    <div class="registerBox" v-else>
      <input type="text" placeholder="请输入账号" v-model="reg.username"><br/>
      <input type="password" placeholder="请输入密码" v-model="reg.password"><br/>
      <button @click="goRegClick">注册</button>
      <div class="toLog" @click="toLog">去登录</div>
    </div>
  </div>
</template>

<script>
import {getUser,getLogin} from '../../api/index'
export default {
  data(){
    return{
      show:true,
      reg:{
        username:"",
        password:"",
      }
    }
  },
  methods:{
    toReg(){
      this.show = false
    },
    toLog(){
      this.show = true

    },
    async goRegClick(){
      let {username,	password} = this.reg
      let myreg = /^1[3456789]\d{9}$/;
      if (username == '' || password == '') {		
          alert('不能为空')
					return
				} else if (!myreg.test(username)) {
				    alert('不符合规则')
					return
				} else if (password.length < 6) {
					  alert('密码需要大于6位')
					return
				}
      let reg = {username,password}
			let aaa = await getUser(reg)
      if(aaa.data.code === 200){
        alert('注册成功') 
        this.reg.username = ''
        this.reg.password = ''
        this.show = true
      }
    },
    // 登录
    async toLogClick(){
      let {username,	password} = this.reg
      let myreg = /^1[3456789]\d{9}$/;
      if (username == '' || password == '') {		
          alert('不能为空')
					return
				} else if (!myreg.test(username)) {
				    alert('不符合规则')
					return
				} else if (password.length < 6) {
					  alert('密码需要大于6位')
					return
				}
      let log = {username,password}
      let login = await getLogin(log)
      console.log(login)
      if(login.data.code === 200){
        alert('登录成功') 
        this.reg.username = ''
        this.reg.password = ''
        this.show = true
        let token = login.data.data.token
        // console.log(token)  
        let setToken = localStorage.setItem('token',token)
        // 派发事件
        this.$store.dispatch('loginStates')
      }
    }
  },
  components: {
  }
};
</script>
<style lang="less" scoped>
  .loginBox{
    width: 300px;
    height: 400px;
    background: salmon;
    margin: 0 auto;
    input{
      margin-top: 20px;
    }
    button{
      width: 100px;
      height: 30px;
      margin: 0 auto;
      margin-top: 20px;
    }
    div{
      margin-top: 20px;

    }
}
.registerBox{
  width: 300px;
  height: 500px;
  background: gold;
  margin: 0 auto;
  margin-top: 20px;
  input{
    margin-top: 20px;
  }
  button{
      width: 100px;
      height: 30px;
      margin: 0 auto;
      margin-top: 20px;
    }
  div{
    margin-top: 20px;

  }
}
</style>
