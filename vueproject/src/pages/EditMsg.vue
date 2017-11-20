<template>
    <div class="edit">
        <div class="back" is="router-link" to="/personmsg"><span>关闭</span></div>
        <div class="editmsg">
        <ul>
            <li>
                 <span>头像</span>
                 <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                 </el-upload> 
            </li>
            <li><span>昵称</span><input type="text" placeholder="未设置" v-model="msg.name"></li>
            <li><span>性别</span><input type="text" placeholder="未设置"  v-model="msg.sex"></li>
            <li><span>个性签名</span><input type="text" placeholder="未设置"  v-model="msg.abstract"></li>
            <li><span>邮箱</span><input type="text" placeholder="未设置"  v-model="msg.email"></li>
        </ul>
        </div>
        <button @click="edit()">确定</button>
    </div>
</template>


<script>
    import { editmsg } from '../api/index.js';
    export default {
        data:function(){
            return {
                msg:{},
                imageUrl: '',
                uploadUrl:'/users/upload',
            }
        },
        methods:{
            edit:function(){
                console.log('修改信息');
                var name= this.msg.name;
                var sex= this.msg.sex;
                var email= this.msg.email;
                var abstract= this.msg.abstract;
                var id = this.msg._id;
                editmsg({name,sex,email,abstract,id}).then(function(res){
                    if(res.status == '1'){
                        localStorage.removeItem('msg');
                        this.$router.push('/login');
                    }
                }.bind(this));
            },

            handleAvatarSuccess(res, file) {
                console.log('123');
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log("imageUrl:"+this.imageUrl);
            },
            beforeAvatarUpload(file) {
              const isJPG = file.type === 'image/jpeg';
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
              }
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isJPG && isLt2M;
            }
        },
        mounted:function(){
            this.msg = JSON.parse(localStorage.msg);
            this.imageUrl = 'http://localhost:3000/'+this.msg.logo
        }
    }
</script>


<style scoped>
        .edit{
            margin-top: 20px;
        }
        .edit .back{
            display:block;
            border-bottom:1px solid #eee;
            margin: 20px 0;
            padding:10px;
            color:#000;
            font-size:18px;
            
        }
        .edit .editmsg ul{
            border-top:1px solid #eee;
            border-bottom:1px solid #eee;
            box-shadow:0 0 5px #eee;
            padding: 0 8px;
        }
        .edit .editmsg li{
            position: relative;
            border-bottom: 1px solid #eee;
            height:40px;
            width:100%;
            line-height: 40px;
        }
        .edit .editmsg li span{
            position: absolute;
            top: 0;
            left: 0;
        }
 
        .edit .editmsg li input[type='text']{
            position: absolute;
            top: 0;
            left:50px;
            height:100%;
            width:70%;
            border:none;
            outline: none;
        }
        .edit .editmsg li:nth-child(4) input[type='text']{
            left:80px;
        }
        .edit button{
            display: block;
            background-color:#42BD56;
            border: none;
            border-radius: 5px;
            width:300px;
            height:35px;
            line-height: 35px;
            color:#fff;
            font-size:18px;
            text-align: center;
            margin:20px auto;
        }
        .avatar-uploader{
            position: absolute;
            top: 10%;
            left:45px;
            width: 30px;
            height: 30px;
            border-radius:50%;
        }
    
        .avatar-uploader .el-upload {
            border: 1px solid #000;
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
            width: 28px;
            height: 28px;
            line-height: 28px;
            text-align: center;
        }  
        .avatar {
            width: 28px;
            height: 28px;
            display: block;
        }
</style>