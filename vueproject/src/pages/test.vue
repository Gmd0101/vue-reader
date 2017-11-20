<template>
 <div>
<el-upload
  class="avatar-uploader"
  :action="uploadUrl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :data="userid"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</div>
</template>

<script>
  import { alter } from '../api/index.js';
  export default {
    data() {
      return {
        imageUrl: '',
        uploadUrl:'/users/alter',
        userid:{
          id:''
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
          console.log('123');
          // console.log(file);
          // console.log(res);
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
    created:function(){
      this.userid.id = (JSON.parse(localStorage.msg))._id;
      console.log(this.userid.id);
    }
  }
</script>

<style>
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