<template>
  <div ref="cur" class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(img, index) in skuImageList"
        :key="img.id"
      >
        <img :src="img.imgUrl" :class="{active : currentActive==index}" @click="changeActive(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      // 当前激活项
      currentActive:0
    }
  },
  props: ["skuImageList"],
  watch: {
    // 监听可以保证数据已经得到了，但是不能保证结构是否已经渲染，因此要使用nextTick
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          // Optional parameters
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView: 3,
          grid: {
            fill: "column",
            rows: 1,
          },
        });
      });
    },
  },
  methods:{
    // 改变当前激活项
    changeActive(index){
      this.currentActive = index
      this.$bus.$emit('getActiveIndex',index)
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover{
        cursor: pointer;
      }

    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>