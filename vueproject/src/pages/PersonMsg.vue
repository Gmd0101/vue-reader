<template>
    <div class="person-msg">
       <div class="return" is="router-link" to="/person"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
       <div class="msg">
          <ul>
              <li><img :src="logo" alt=""></li>
              <li>
                <p>{{msg.name}}</p>
                <span><b>0</b> 关注</span>  <span><b>0</b> 粉丝</span>
              </li>
         </ul>
       </div>
       <p class="intro">{{msg.abstrac}}</p>
       <div class="edit" is="router-link" to="/editmsg"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>编辑个人资料</div>
       <div class="list">
         <ul>
             <li><i class="fa fa-book" aria-hidden="true"></i><span>文集<b>0</b></span></li>
             <li><i class="fa fa-th-large" aria-hidden="true"></i><span>专题<b>0</b></span></li>
             <li><i class="fa fa-check-square" aria-hidden="true"></i><span>关注<b>0</b></span></li>
             <li><i class="fa fa-users" aria-hidden="true"></i><span>粉丝<b>0</b></span></li>
         </ul>
      </div>
      <div class="fav">
         <ul>
            <li><span><i class="fa fa-heart" aria-hidden="true"></i>  喜欢的文章</span><span><i>{{cLength}}</i>  <i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
            <li><span><i class="fa fa-check" aria-hidden="true"></i>  关注的专题/文集</span><span><i>0</i>  <i class="fa fa-angle-right" aria-hidden="true"></i></span></li>
         </ul>
     </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      msg: {},
      logo: "",
      collect: null,
      cLength: 0
    };
  },
  mounted: function() {
    this.msg = JSON.parse(localStorage.msg);
    console.log(this.msg);
    this.collect = JSON.parse(localStorage.collect);
    this.logo = "http://localhost:3000/" + this.msg.logo;

    this.cLength = this.collect.length;
  }
};
</script>


<style scoped>
.person-msg {
  margin-top: 15px;
}
.person-msg .return {
  margin: 8px;
  width: 30px;
  height: 30px;
}
.person-msg .return i {
  color: #555;
  font-size: 28px;
}
.person-msg .msg ul {
  width: 90%;
  margin: 15px;
}
.person-msg .msg ul::after {
  display: table;
  content: "";
  clear: both;
}
.person-msg .intro {
  margin: 0 15px;
  font-size: 15px;
  color: #555;
}
.person-msg .msg ul li {
  float: left;
}
.person-msg .msg ul li:nth-child(2) {
  margin-left: 15px;
  padding-top: 15px;
}
.person-msg .msg ul li img {
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
.person-msg .msg ul li:nth-child(2) p {
  font-size: 24px;
  margin-bottom: 10px;
}
.person-msg .msg ul li:nth-child(2) span {
  color: #555;
}
.person-msg .edit {
  display: block;
  border: 1px solid #42bd56;
  border-radius: 5px;
  margin: 15px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #42bd56;
}
.person-msg .list ul {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border: 1px solid #eee;
  border-left: none;
  border-right: none;
  padding: 15px;
  box-shadow: 0 0 5px #eee;
}
.person-msg .list {
  margin: 15px 0;
}
.person-msg .list ul li {
  display: flex;
  flex-flow: column nowrap;
  font-size: 14px;
  text-align: center;
  padding: 8px;
  color: #aaa;
}
.person-msg .list ul li i {
  font-size: 25px;
}
.person-msg .fav ul li {
  height: 40px;
  line-height: 40px;
  border: 1px solid #eee;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 14px;
}
.person-msg .fav ul li i {
  color: #aaa;
}
.person-msg .fav ul li:nth-child(1) {
  border-bottom: none;
}
</style>