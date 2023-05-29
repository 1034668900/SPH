<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- Footer组件在home和search路由组件下才显示 -->
    <Footer v-show="this.$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
// 引入Header组件
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
