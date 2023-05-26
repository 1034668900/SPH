<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentShowIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="skuImageList[currentShowIndex].imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentShowIndex: 0,
    };
  },
  props: ["skuImageList"],
  mounted() {
    // 全局事件总线--绑定获取当前显示大图的索引
    this.$bus.$on("getActiveIndex", (index) => {
      this.currentShowIndex = index;
    });
  },
  methods: {
    handler(event) {
      // 获取蒙板的元素对象
      let mask = this.$refs.mask;
      // 获取放大图的元素对象
      let big = this.$refs.big;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      // 限制蒙板位置
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      // 更新蒙板的位置
      mask.style.left = left + "px";
      mask.style.top = top + "px";

      // 更新大图的位置
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>