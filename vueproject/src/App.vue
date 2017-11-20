<template>
  <div id="app">
    <router-view></router-view>
    <tabbar class="footer">
      <tabbar-item v-model='selected' link="/" events="on-item-click">
        <img slot="icon icon-active" src="./assets/images/ic_tab_home_normal.png">
        <img slot="icon" src="./assets/images/ic_tab_home_active.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/find">
        <img slot="icon icon-active" src="./assets/images/ic_tab_subject_normal.png">
        <img slot="icon" src="./assets/images/ic_tab_subject_active.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item link="/person">
        <img slot="icon icon-active" src="./assets/images/ic_tab_profile_normal.png">
        <img slot="icon" src="./assets/images/ic_tab_profile_active.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import {Tabbar,TabbarItem} from 'vux';


export default {
  name: 'app',
  components:{
    Tabbar,
    TabbarItem
  },
  data:function(){
    return {
      selected:true,
      result:''
    }
  },
  methods:{
    regist:function(){
      
    }
  }
}
</script>














<style lang="less">
@import '~vux/src/styles/reset.less';
</style>

<style scoped>
   body {
  background-color: #fbf9fe;
  }
  .footer{
    background-color:#eee;
    position:fixed;
  }
</style>
