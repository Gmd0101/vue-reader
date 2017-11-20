<template>
     <div class="article-detail">
        <h1>{{article.title}}</h1>
        <div class="article-author">
                <ul>
                    <li><img :src="logo" alt=""><span>{{article.userId.name}}</span></li> 
                    <li @click="artcollect()"><span>收藏</span></li>
                </ul>
        </div>
        <div class="article-msg"><span>{{article.createTime}}</span> 阅读 <span>{{article.browerCount}}</span> 被赞 <span>{{article.favoriteCount}}</span></div>
        <p>{{article.content}}</p>
        <div class="reply">
            <div class="reply-title">
              <span>评论 <i>{{article.replyCount}}</i></span><span>倒序</span>
            </div>
            <ul class="reply-list">
                    <li class="reply-item" v-for="(reply,index) in replylist" :key="index">
                          <div class="article-author">
                                  <ul>
                                      <li><img :src="'http://localhost:3000/'+reply.userId.logo" alt=""><span>{{reply.userId.name}}</span></li> 
                                      <li><span>回复</span></li>
                                  </ul>
                          </div>
                          <p>{{reply.content}}</p>
                    </li>
                </ul>
           <div class="sub-reply" v-if='logined'>
                <textarea name="" id="" cols="10" rows="3" v-model="replycontent"></textarea>
                <!-- <button >发表评论</button> -->
                <Button type="success" @click="comment()">发表评论</Button>
           </div>
        </div>
        <actionsheet v-model='show' :menus="menu" theme="android" ></actionsheet>
        <actionsheet v-model='show1' :menus="menu2" theme="android" ></actionsheet>
     </div>
</template>


<script>
import bus from "../bus.js";
import { detail, collect, reply, getreply } from "../api/index";
import { Actionsheet } from "vux";
export default {
  components: {
    Actionsheet
  },
  data: function() {
    return {
      article: null,
      logo: "",
      show: false,
      show1: false,
      menu: { menu1: "收藏成功" },
      menu2: { menu1: "评论内容为空" },
      replycontent: null,
      replylist: [],
      logined:false
    };
  },
  methods: {
    getid: function(id) {
      var articleid = id;
      detail({ articleid: articleid }).then(
        function(res) {
          if (res.status == "1") {
            this.article = res.result;
            this.logo = "http://localhost:3000/" + this.article.userId.logo;
          }
        }.bind(this)
      );
    },
    artcollect: function() {
      var articleId = this.article._id;
      var userId = JSON.parse(localStorage.msg)._id;
      collect({ articleId, userId }).then(
        function(res) {
          if (res.status == "1") {
            console.log(res.msg);
            this.show = !this.show;
            setTimeout(
              function() {
                this.show = !this.show;
              }.bind(this),
              1000
            );
          }
        }.bind(this)
      );
    },
    comment: function() {
      var userId = JSON.parse(localStorage.msg)._id;
      var articleId = this.$route.params.id;
      var content = this.replycontent;
      if (content) {
        reply({ userId, articleId, content }).then(
          function(res) {
            if (res.status == "1") {
              window.location.reload();
            }
          }.bind(this)
        );
      } else {
        this.show1 = !this.show1;
          setTimeout(function() {
                this.show1 = !this.show1;
          }.bind(this),1000);
      }
    },
    getreplies: function(id) {
      var articleId = id;
      console.log("12312314");
      getreply({ articleId }).then(
        function(res) {
          if (res.status == "1") {
            console.log(res);
            console.log("__________________");
            this.replylist = res.result;
            console.log(this.replylist);
          }
        }.bind(this)
      );
    }
  },
  mounted: function() {
    //bus.$on('articledetail',this.getid);
    if (this.$route.params.id) {
      var id = this.$route.params.id;
      this.getid(id);
      this.getreplies(id);
    }
    if(localStorage.msg){
      this.logined = !this.logined;
    }
  }
};
</script>

<style scoped>
.article-detail {
  padding: 20px 8px;
  margin-bottom: 70px;
}
.article-detail h1 {
  padding: 0 8px;
}
.article-author {
  margin-top: 8px;
}
.article-author img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 2px 8px 2.5px 0;
}
.article-author ul {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.article-author ul li {
  height: 35px;
  line-height: 35px;
  padding: 0 8px;
  font-size: 14px;
}
.article-author ul li:nth-child(1) {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
}
.article-author ul li:nth-child(2) span {
  background-color: rgb(65, 175, 29);
  padding: 3px 8px;
  color: #fff;
  border-radius: 5px;
}
.article-msg {
  font-size: 12px;
  margin: 8px 0;
  color: #555;
}
.article-detail p {
  text-indent: 2em;
  margin: 15px 0;
  line-height: 2;
  font-family: "宋体";
  font-size: 14px;
}
.article-detail .reply .reply-title {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 3px;
  font-size: 14px;
}
.article-detail .reply .reply-title i {
  font-style: normal;
}
.article-detail .reply .reply-item {
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
}
.article-detail .reply .reply-item p {
  font-size: 14px;
  margin: 0;
}
.article-detail .reply .reply-item li:nth-child(2) span{
  background-color:#aaa;
  padding:0 3px 0 3px;
  color: #fff;
  border-radius: 5px;
  font-size:12px;
}
.article-detail .reply .sub-reply textarea {
  width: 100%;
}
.article-detail .reply .sub-reply button {
  float: right;
}
</style>