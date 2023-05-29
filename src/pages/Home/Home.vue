<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <list-container></list-container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import Floor from "./Floor/Floor.vue";
import Like from "./Like/Like.vue";
import ListContainer from "./ListContainer/ListContainer.vue";
import Rank from "./Rank/Rank.vue";
import Recommend from "./Recommend/Recommend.vue";
import Brand from "./Brand/Brand.vue";
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },

  /*  
  这里Home组件中派发的action已经在全局前置守卫中派发了
    mounted() {
       派发action获取用户信息
      this.getUserInfo();
    },
    methods: {
      登录成功后派发action获取用户信息
      async getUserInfo() {
        try {
          await this.$store.dispatch("getUserInfo");
        } catch (error) {
           alert(error.message);
        }
      },
    },
  */
};
</script>

<style scoped>
</style>