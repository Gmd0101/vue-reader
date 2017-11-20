<template>
    <div class="writearea">
         <group>
            <x-input placeholder="标题" v-model="title"></x-input>
             <scroller lock-y :scrollbar-x=false>
                   <div class="box1">
                       <div class="box1-item" v-for="ca in categories" @click="getcate()">{{ca}}</div>
                   </div>
             </scroller>
             <span class="cate">{{cate}}</span>
            <x-textarea :max="10000" name="description" placeholder="内容" :height="350" v-model="content"></x-textarea>
         </group>
         <i-button type="info" class="btn" @click="publish()">发表</i-button>
         <actionsheet v-model='show' :menus="menu" theme="android" ></actionsheet>
    </div>
</template>

<script>
    import { XTextarea, Group, XInput, Scroller, Actionsheet} from 'vux'
    import { category,article } from '../api/index.js'
    export default {
        components:{
            XTextarea,
            Group,
            XInput,
            Scroller,
            Actionsheet
        },
        data:function(){
            return {
                categories:[],
                title:'',
                content:'',
                cate:'',
                show:false,
                menu:{menu1:'发表成功'},
            }
        },
        methods:{
            getcate:function($event){
                this.cate = event.target.innerText;
                console.log(event.target.innerText);
            },
            //获取数据并发布
            publish:function(){
                console.log('123');
                var title = this.title;
                var content = this.content;
                var category = this.cate;
                var userId = (JSON.parse(localStorage.msg))._id;
                console.log(title+''+content+''+category+''+userId);
                article({
                    title,
                    content,
                    category,
                    userId
                }).then(function(res){
                    if(res.status =='1'){
                        this.show = !this.show;
                        setTimeout(function(){
                            location.href="#/";
                            this.show = !this.show;
                        },1500);
                    }
                }.bind(this));

            }
        },
        mounted:function(){
             category({}).then(function(res){
                    if(res.status == "1"){
                        for(let i = 0;i<res.result.length;i++){
                            this.categories.push(res.result[i].name);
                        }
                    }
                }.bind(this));
        }
    }
</script>

<style scoped>
.btn{
    margin:10px 20px;
    float:right;
}
.writearea{
    margin-bottom:150px;
}
.cate{
    margin:0 14px;
    color:#aaa;
}
.box1 {
  height: 50px;
  position: relative;
  width: 660px;
}
.box1-item {
  width: 80px;
  height: 35px;
  background-color: #2DB7F5;
  color:#fff;
  font-size:14px;
  display:inline-block;
  margin:7px;
  float: left;
  text-align: center;
  line-height: 35px;
}
.box1-item:first-child {
  margin-left: 0;
}



 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
</style>