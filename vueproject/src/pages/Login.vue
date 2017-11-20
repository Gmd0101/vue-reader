<template>
    <div class="login">
        <h1>xx</h1>
        <div class="login-box" v-show="flag">
            <ul>
                <li><i class="fa fa-mobile" aria-hidden="true"></i><input type="text" placeholder="手机号" v-model="phone"></li>
                <li><i class="fa fa-lock" aria-hidden="true"></i><input type="password" placeholder="密码" v-model="password"></li>
            </ul>
            <br>
            <span v-if="pp">{{hint}}</span>
            <br>
            <button @click="log()">登录</button>
        </div>
        <div class="login-box" v-show="!flag">
            <ul>
                <li><i class="fa fa-mobile" aria-hidden="true"></i><input type="text" placeholder="你的昵称" v-model="name"></li>
                <li><i class="fa fa-mobile" aria-hidden="true"></i><input type="text" placeholder="手机号" v-model="phone"></li>
                <li><i class="fa fa-lock" aria-hidden="true"></i><input type="password" placeholder="密码" v-model="password"></li>
            </ul>
            <br/>
             <span v-if="rp">{{rhint}}</span>
            <br>
            <button @click="reg()">注册</button>
        </div>
        <div class="third-party">
            <span class="s-title">社交账号直接登录</span>
            <a href="#"><i class="fa fa-weixin" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-qq" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-weibo" aria-hidden="true"></i></a>
        </div>
        <div class="footer"><span @click="regist()" v-if="!flag">已有账号</span><span @click="regist()" v-if="flag">注册</span> | <a href="#/forget" v-if="flag">忘记密码</a> | <router-link to="/">随便看看</router-link></div>
    </div>
</template>


<script>
import { register, login, userwrite, personalcollect } from "../api/index.js";
import bus from "../bus.js";
export default {
  data: function() {
    return {
      flag: true,
      pp: false,
      rp: false,
      name: null,
      phone: null,
      password: null,
      result: null,
      hint: "",
      rhint: ""
    };
  },
  methods: {
    regist: function() {
      this.flag = !this.flag;
    },
    log: function() {
      var phone = this.phone,
        password = this.password;
      if (!phone || !password) {
        this.pp = !this.pp;
        this.hint = "账号或密码为空";
        return;
      }
      console.log(phone + "," + password);
      login({
        phone,
        password
      }).then(
        function(res) {
          if (res.status == "0") {
            this.pp = !this.pp;
            this.hint = res.msg;
          } else {
            console.log("登录成功");
            this.result = res.result;
            var personid = this.result._id;
            var userId = personid;
            userwrite({ userId }).then(function(res) {
              if (res.status == "1") {
                localStorage.userwrite = JSON.stringify(res.result);
              }
            });
            personalcollect({ userId }).then(function(res) {
              if (res.status == "1") {
                localStorage.collect = JSON.stringify(res.result);
                console.log(localStorage.collect);
              }
            });
            // console.log(personid);
            // bus.$emit('loginmsg',this.result);
            this.$router.push(`/person/${personid}`);
          }
        }.bind(this)
      );
    },
    reg: function() {
      var name = this.name,
        password = this.password,
        phone = this.phone;
      register({ name, password, phone }).then(
        function(res) {
          if (res.status == "0") {
            this.rp = !this.rp;
            this.rhint = res.msg;
          } else {
            console.log("注册成功");
            this.flag = !this.flag;
            console.log(res);
          }
        }.bind(this)
      );
    }
  }
};
</script>

    <style scoped>
.login {
  width: 100%;
  text-align: center;
  margin-bottom: 65px;
}

.login h1 {
  color: coral;
  margin: 30px;
}
.login-box ul {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
.login-box span {
  color: red;
  font-size: 12px;
}
.login-box ul li {
  position: relative;
}
.login-box ul li input {
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  height: 45px;
  width: 260px;
  padding: 0 35px;
  color: #444;
}
.login-box ul li:last-of-type input {
  border: none;
}
.login-box ul li i {
  top: 30%;
  left: 5%;
  position: absolute;
  color: #ccc;
  font-size: 16px;
}
.login-box button {
  width: 260px;
  height: 45px;
  border: none;
  border-radius: 8px;
  background-color: rgb(75, 184, 75);
  color: #fff;
  font-size: 20px;
  margin-top: 15px;
}
.third-party {
  position: relative;
  width: 240px;
  margin: 45px auto;
  padding-top: 25px;
  border-top: 1px solid #ccc;
}
.third-party .s-title {
  position: absolute;
  top: -20%;
  left: 20%;
  padding: 0 8px;
  background-color: #fff;
}
.third-party a {
  width: 50px;
  height: 50px;
  line-height: 40px;
  display: inline-block;
  border: 1px solid red;
  padding: 5px;
  margin: 0 5px;
  text-align: center;
  border-radius: 50%;
}
.third-party a i {
  font-size: 26px;
  color: lightskyblue;
}
.login .footer span:nth-child(1) {
  color: coral;
}
</style>