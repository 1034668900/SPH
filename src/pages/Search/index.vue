<template>
  <div>
    <TypeNav  />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-带有 x 的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-for="(attr,index) in searchParams.props" :key="index">
              {{ attr.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOrderOne}">
                  <a  @click="changeOrder(1)">综合
                    <span v-show="isOrderOne" class="iconfont" :class="{'icon-up':isIconUp, 'icon-down': isIconDown}"></span>
                  </a>
                </li>
                <li :class="{active: isOrderTwo}">
                  <a  @click="changeOrder(2)">价格
                    <span v-show="isOrderTwo" class="iconfont" :class="{'icon-up':isIconUp, 'icon-down': isIconDown}"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector.vue";
export default {
  name: "search",
  data() {
    return {
      // 准备请求参数的响应式对象
      searchParams: {
        // 一级菜单Id
        category1Id: "",
        // 二级菜单Id
        category2Id: "",
        // 三级菜单Id
        category3Id: "",
        // 分类名
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 升降序
        order: "1:desc",
        // 分页器相关的
        pageNo: 1,
        pageSize: 10,
        // 平台售卖属性带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },

  components: {
    SearchSelector,
  },
  // 在mounted之前将请求参数对象进行更新
  beforeMount() {
    this.searchParams = Object.assign(
      this.searchParams,
      this.$route.query,
      this.$route.params
    );
  },
  mounted() {
    // 派发一个getSearchList请求获取数据
    this.getSearchResult();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    // 判断searchParams.order 里包含1还是2
    isOrderOne(){
      return this.searchParams.order.indexOf('1') != '-1'
    },
    isOrderTwo(){
      return this.searchParams.order.indexOf('2') != '-1'
    },
    isIconUp(){
      return this.searchParams.order.indexOf('asc') != '-1'
    },
    isIconDown(){
      return this.searchParams.order.indexOf('desc') != '-1'
    }
  },
  methods: {
    // getSearchList请求执行的次数可能会有许多，因此将其封装为一个函数
    getSearchResult() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },

    // 移除分类名面包屑
    /*  
    移除相应的面包屑,当categoryName都置空后，分类Id也没有了意义，因此分类Id也置空
    但是如果仅仅是置空，当再次请求时这些参数也会携带过去，可以做一个 小的优化，将其置为undefined、
    这样再次发送请求时就不会携带这些参数 */
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getSearchResult();
      // 地址栏也需要修改,可以通过路由跳转实现清除query参数，但是应该只清除query参数，params参数应该保留，因此路由跳转时应该携带该参数
      this.$router.push({
        name: "search",
        params: this.$route.params,
      });
    },

    // 移除关键字面包屑
    /* 移除关键字面包屑后，应该重新请求当前分类的数据进行展示,同时地址栏应该更新
        同时Header组件搜索框中关键字也应该置空(组件通信)
        此时移除关键字面包屑后，再次发起请求时应该携带query参数
     */
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.$router.push({
        name: "search",
        query: this.$route.query
      });
      this.getSearchResult();
      // 置空Header组件搜索框(全局事件总线)
      this.$bus.$emit('clearSearchValue')
      
    },

    // 处理品牌信息的回调
    tradeMarkInfo(tm){
      // 整理请求参数
      this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`
      // 发起请求
      this.getSearchResult()
    },
    // 移除品牌信息的面包屑
    removeTrademark(){
      this.searchParams.trademark = undefined
      // 再次发起请求
      this.getSearchResult()

    },

    // 平台售卖属性的回调
    attrInfo(attr, attrValue){
      console.log("我是父组件",attr,attrValue);
      // 整理参数  格式： ["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 将参数添加到数组(先判断是否已有该参数)
      if(this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)
      // 参数整理完毕后再次发起请求
      this.getSearchResult()
    },
    // 平台售卖属性面包屑删除
    removeAttr(index){
      // 从searchParams里的props数组中删除index项
      this.searchParams.props.splice(index,1)
      // 此时请求参数发生改变，再次发起请求
      this.getSearchResult()
    },

    // 综合和价格按钮排序
    /* 
      flag： 判断用户点击的是谁    综合：1   价格：2   用户点击时传递进来的
    */
    changeOrder(flag){
      if(this.isIconUp){
        this.searchParams.order = `${flag}:desc`
      }else if(this.isIconDown){
        this.searchParams.order = `${flag}:asc`
      }

      this.getSearchResult()
    }
  },
  watch: {
    // 由于每次请求SearchList重新发起请求时，路由都会发生改变，因此可以通过监听路由的变化来实现
    $route(newValue, oldValue) {
      // 重新发起请求时应该在整理请求参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发起请求
      this.getSearchResult();
      // 每次请求结束后都应该把相应的一二三级ID清空，避免下次请求不同层级时会携带上一次的Id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>