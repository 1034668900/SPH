<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="resetIndex">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <div class="sort">
          <!-- 绑定路由跳转事件--事件委派 -->
          <div class="all-sort-list2" @click="goSearch($event)">
            <div
              :class="{ curStyle: currentIndex === index }"
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  style="text-decoration: none"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二级、三级菜单 -->
              <div
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
                class="item-list clearfix"
              >
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-category2Id="c2.categoryId"
                        :data-categoryName="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-category3Id="c3.categoryId"
                          :data-categoryName="c3.categoryName"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入lodash
import throttle from "lodash/throttle";

export default {
  data() {
    return {
      // 记录鼠标当前悬停的下标 -- 为了保证初始时一级菜单没有背景颜色，currentIndex初始值要给一个不在一级菜单数量内的数字
      currentIndex: -1,
    };
  },
  name: "TypeNav",
  // 应该在该三级联动组件挂载完毕时就向actions派发请求
  mounted() {
    this.$store.dispatch("categoryList");
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList.data,
    }),
  },
  methods: {
    // 鼠标移入一级菜单事件
    /*     changeIndex(index) {
      this.currentIndex = index; 
    }, */
    // 鼠标移入事件节流(借用第三方库)
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标离开一级菜单事件
    resetIndex() {
      this.currentIndex = -1;
    },

    // 路由跳转事件
    goSearch(event) {
      // 拿到触发的元素对象
      let element = event.target;
      // 利用dataset属性获取元素对象上的自定义属性并解构 -- 浏览器自动将自定义属性转换为小写
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;

      // 判断是否含有categoryname  --> 为了判断是不是a标签触发的事件
      if (categoryname) {
        // 准备路由跳转的对象
        let location = { name: "search" };
        // 准备携带的参数，携带的具体Id此处无法判断，经判断后再添加
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 将参数合并到路由跳转对象中
        location.query = query;
        // 进行路由跳转
        this.$router.push(location);
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  margin-bottom: 50px;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .curStyle {
          background-color: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.type-nav:hover{
  cursor: pointer;
}
</style>