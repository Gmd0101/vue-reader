<template>
  <div class="index">
     <el-carousel height='150px'>
         <el-carousel-item v-for="item in 4" :key="item">
             <h3>{{ item }}</h3>
         </el-carousel-item>
     </el-carousel>
     <div class="category">
         <ul class="category-list">
           <li class="category-item" v-for="(item,index) in cate"><i class="fa fa-leanpub" aria-hidden="true" @click="category(item)"></i>{{item.name}}</li>
           <li class="category-item"><i class="fa fa-leanpub" aria-hidden="true"></i>更多</li>
        </ul>
     </div>
      <div class="article-box">
            <ul class="article-list">
                <li class="article-item" v-for="(article,index) in articleList" :articleid="article.articleId"  @click="articleDetail(article)">
                    <span :id="id" v-show='false'>{{article._id}}</span>
                    <div class="header">
                        <ul>
                            <li><img :src="'http://localhost:3000/'+article.userId.logo" alt=""><span>{{article.userId.name}}</span></li> 
                            <li><span>{{article.category}}</span></li>
                        </ul>
                    </div>
                    <div class="article">
                            <h3>{{article.title}}</h3>
                            <p>{{article.content}}</p>
                    </div>
                    <div class='article-msg'>
                        <i class="fa fa-eye" aria-hidden="true"></i>    <span>{{article.browerCount}}</span>
                        <i class="fa fa-heart" aria-hidden="true"></i>   <span>{{article.favoriteCount}}</span>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import { category,gainarticle,brower } from '../api/index.js'
export default {
  name: 'hello',
  data:function(){
    return{
      cate:null,
      articleList:null,
      id:0
    }
  },
  methods:{
      category:function(event){
          console.log(event.name);
          var category = event.name;
          this.$router.push(`/categorylist/${category}`);
      },
      articleDetail:function(event){
          var articleid = event._id;
          brower({articleid}).then(function(res){
              console.log(res.msg);
          });
          this.$router.push({path:`/articledetail/${articleid}`});
         }
  },
  mounted:function(){
    category({}).then(function(res){
      this.cate = res.result;
      console.log(this.cate[0].name);
    }.bind(this));

    gainarticle({}).then(function(res){
           if(res.status == "1"){
             this.articleList = res.result;
           }
         }.bind(this));
  }
}
</script>

<style scoped>
  html,body{
     width:100%;
  }
  .index{
    margin-bottom:65px;
  }
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height:50px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .category{
    width:100%;
    margin-top:20px;
    box-shadow:0 0 5px #ccc;
    background-color:#fff;
  }
  .category .category-list{
    width:100%;
    display:flex;
    flex-flow:row wrap;
    justify-content:space-around;
  }
  .category .category-list .category-item{
    width:16%;
    height:55px;
    margin:8px;
    text-align:center;
  }
  .category .category-list .category-item i{
    display:block;
    width:35px;
    height:35px;
    line-height:33px;
    margin:auto;
    border-radius:50%;
    font-size:20px;
    color:#fff;
    background-color:#42BD56;
  }
      .article-box{
            width:100%;
        }
        .article-box .article-list{
            width: 100%;
        }
        .article-box .article-list .article-item {
            border-bottom: 1px solid #ccc;
            padding-bottom: 8px;
            margin:8px;
        }
        .article-box .article-list .article-item img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 2px 8px 2.5px 0;
        }
        .article-item .header ul{
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
        }
        .article-item .header ul li{
           height:35px;
           line-height:35px;
           padding: 0 8px;
           font-size: 14px;
        }
        .article-item .header ul li:nth-child(1){
            display: flex;
            flex-flow: row nowrap;
            align-items: flex-start;
        }
        .article-item .header ul li:nth-child(2) span{
            border-left:2px solid coral;
            padding-left:5px;
        }
        .article{
            margin: 0 10px;
        }
        .article h3{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-size:16px;
        }
        .article p{
            text-indent: 2em;
            height:40px;
            font-size:14px;
            margin-top: 4px;
            display: -webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .article-msg{
            padding: 0 10px;
            font-size:12px;
            color:#aaa;
        }
</style>

