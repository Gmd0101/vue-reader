<template>
   <div>
       <div class="edit">
           <Input v-model="phone" placeholder="请输入手机号" style="width: 300px"></Input>
           <Alert class="alert" type="error" show-icon v-if="regiser">该手机号尚未被注册</Alert>
           <Input v-model="password" placeholder="请输入新密码" type="password" style="width: 300px"></Input>
           <Button type="info" @click="editpassword()">确认修改</Button>
       </div>
       <actionsheet v-model='show' :menus="menu" theme="android" ></actionsheet>
   </div>
</template>
<script>
import { editpsw } from "../api/index";
import {Actionsheet} from 'vux';
export default {
  components:{
      Actionsheet
  },
  data() {
    return {
      phone: "",
      password: "",
      show:false,
      menu:{menu1:'修改成功，跳转到登录页面...'},
      regiser:false
    };
  },
  methods: {
    editpassword: function() {
      console.log("123");
      var phone = this.phone;
      var password = this.password;
      editpsw({ phone, password }).then(function(res) {
        if (res.status == "1") {
            this.show = !this.show;
            setTimeout(function() {
                this.show = !this.show;
                this.$router.push('/login');
              }.bind(this),2000);
        }else if(res.status == '2'){
            this.regiser = !this.regiser;
        }
      }.bind(this));
    }
  }
};
</script>


<style scoped>
.edit{
    text-align: center;
    margin-top: 100px;
}
.alert{
    width: 300px;
    margin: auto;
}
</style>