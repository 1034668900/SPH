<template>
  <div >
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
import Floor from './Floor/Floor.vue';
import Like from './Like/Like.vue';
import ListContainer from "./ListContainer/ListContainer.vue";
import Rank from './Rank/Rank.vue';
import Recommend from './Recommend/Recommend.vue';
import Brand from './Brand/Brand.vue'
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
};
</script>

<style scoped>

</style>