<template>
    <div class="personal-center">
        <div class="personal-top" v-if="status">
            <img :src="'http://localhost:3000/'+ userMsg.logo" alt="">
            <ul>
                <li><h2>{{userMsg.name}}</h2></li>
                <li><p>{{userMsg.abstract}}</p></li>
            </ul>
            <button @click="out()">退出</button>
        </div> 
         <div class="personal-top" v-if="!status">
            <img :src="defaultImg">
            <ul>
                <li><h2>未登录</h2></li>
                <li><p>个性签名:</p></li>
            </ul>
            <a href="#/login">登录</a>
        </div>
        <div class="publish" v-if="write">
            <a href="#/write">发布文章</a>
        </div>
         <div class="publish" v-if="!write">
            <a href="#/login">发布文章</a>
        </div>
        <div class="personal-list" v-if="status">
            <ul>
                <li class="li"><i class="fa fa-bookmark-o" aria-hidden="true"></i>   收藏的文章 <span><b>{{cLength}}</b><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
                <li class="li"><i class="fa fa-file-text-o" aria-hidden="true"></i>  我发表的<span><b>{{aLength}}</b><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
                <li class="li" is='router-link' to="/personmsg"><i class="fa fa-user" aria-hidden="true"></i>   个人信息<span><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
                <li class="li"><i class="fa fa-cog" aria-hidden="true"></i>   设置<span><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
            </ul>
        </div>
         <div class="personal-list" v-if="!status">
            <ul>
                <li class="li" is='router-link' to="/login"><i class="fa fa-bookmark-o" aria-hidden="true"></i>   收藏的文章 <span><b>0</b><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
                <li class="li" is='router-link' to="/login"><i class="fa fa-file-text-o" aria-hidden="true"></i>  我发表的<span><b>0</b><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
                <li class="li" is='router-link' to="/login"><i class="fa fa-user" aria-hidden="true"></i>   个人信息<span><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
                <li class="li" is='router-link' to="/login"><i class="fa fa-cog" aria-hidden="true"></i>   设置<span><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
            </ul>
        </div>

    </div>
</template>

<script>
import bus from "../bus.js";
import { person, userwrite } from "../api/index.js";
export default {
  data: function() {
    return {
      status: false,
      defaultImg: "../static/images/default.jpg",
      userMsg: null,
      test: "123",
      personid: null,
      write: false,
      logo: "",
      collect: [],
      userarticles: null,
      aLength: 0,
      cLength: 0
      //{{userarticles.result.length}}
    };
  },
  methods: {
    out: function() {
      //退出清除本地缓存
      localStorage.removeItem("msg");
      localStorage.removeItem("collect");
      localStorage.removeItem("userarticles");
      this.status = !this.status;
      this.write = !this.write;

      this.$router.push("/person");
    },
    getMsg: function() {
      var personid = this.personid;
      person({ personid }).then(
        function(res) {
          if (res.status == "1") {
            this.userMsg = res.result;
            //得到的个人信息数据加入到本地缓存
            localStorage.msg = JSON.stringify(this.userMsg);
          }
        }.bind(this)
      );
      this.status = !this.status;
      this.write = !this.write;
      //从缓存中获得数据
      this.userMsg = JSON.parse(localStorage.msg);

      this.userarticles = JSON.parse(localStorage.userwrite);
      this.aLength = this.userarticles.length;
      
      this.collect = JSON.parse(localStorage.collect);
      this.cLength = this.collect.length;
    }
  },
  mounted: function() {
    if (this.$route.params.id) {
      this.personid = this.$route.params.id;
    }
    this.getMsg();
  }
};
</script>

    <style scoped>
.personal-center {
  height: 100%;
  width: 100%;
  background-color: rgb(248, 248, 248);
  padding: 0 5px;
}
.personal-top {
  width: 100%;
  padding: 50px 15px 40px;
  line-height: 2.5;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 0 5px #ccc;
}
.personal-top::after {
  content: "";
  display: table;
  clear: both;
}
.personal-top img {
  width: 60px;
  height: 60px;
  box-shadow: 0 0 3px #ccc;
  border-radius: 100%;
  float: left;
}
.personal-top ul {
  float: left;
  width: 150px;
  margin-left: 15px;
}
.personal-top ul li h2 {
  font: normal 20px "楷体";
  color: #555;
  font: normal 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.personal-top ul li p {
  font-size: 10px;
  line-height: 1;
  padding: 8px 0;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.personal-top a {
  border-radius: 5px;
  padding: 6px 12px;
  background-color: #42bd56;
  color: #fff;
}
.personal-top button {
  border: none;
  border-radius: 5px;
  position: absolute;
  top: 30px;
  right: 20px;
  padding: 0 12px;
  background-color: #42bd56;
  color: #fff;
}
.publish {
  width: 100%;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
}
.publish a {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 15px 0;
  text-align: center;
  border-radius: 10px;
  color: #666;
  letter-spacing: 3px;
}
.personal-list {
  margin-top: 15px;
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
  background-color: #fff;
}
.personal-list ul {
  padding: 10px;
}
.personal-list ul .li {
  display: block;
  padding: 10px;
  margin: 10px 0;
  background-color: rgb(252, 248, 248);
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #777;
}
.personal-list ul .li span b {
  font-weight: normal;
  margin-right: 10px;
}
.personal-list ul .li span {
  float: right;
}
</style>