<template>
   <div>
        <div class="article-box">
            <ul class="article-list">
                <li class="article-item" v-for="(article,index) in articleList" :articleid="article.articleId" @click="articleDetail(article)">
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
    
    import {catelist} from '../api/index.js';
    export default {
        data:function(){
            return {
                articleList:[]
            }
        },
        methods:{
            articleDetail:function(event){
                var articleid = event._id;
                //  bus.$emit('articledetail',articleid);
               //  location.href='#/articledetail'
               // router.push({ path: `/user/${userId}` })
                this.$router.push({path:`/articledetail/${articleid}`});
         }
        },
        mounted:function(){
            // console.log(this.$route.params.id);
            var id = 1;
            var category = this.$route.params.id;
            catelist({category}).then(function(res){
                if(res.status=="1"){
                    //数组
                    this.articleList = res.result;
                }
            }.bind(this));
        }
    }
</script>


<style scoped>
          .article-box{
            width:100%;
            margin-bottom:65px;
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
            padding: 0 28px;
            font-size:12px;
            color:#555;
        }
</style>