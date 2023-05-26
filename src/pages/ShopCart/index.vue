<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="goodInfo in CartList">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="goodInfo.isChecked == 1"
              @change="updateChecked(goodInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="goodInfo.imgUrl" />
            <div class="item-msg">
              {{ goodInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ goodInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('sub', -1, goodInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="goodInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('input', $event.target.value * 1, goodInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, goodInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ goodInfo.skuNum * goodInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteShop(goodInfo)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckedAll && CartList.length > 0"
          @change="checkedAll($event.target.checked)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ cartTotalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "lodash";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 派发购物车列表的actions
      this.$store.dispatch("getShopCartList");
    },
    // 处理商品数量改变的回调--节流处理
    handler: throttle(async function (Type, num, goodInfo) {
      /* 
        Type : 用于判断点击的是哪个对象 - ： sub  +：add  输入框：input
        value : 有三种情况， -1，1，最终值。 -1和1是变化量，最终发送请求需要的就是数量的变化量
        goodInfo ：代表的是点击的是该商品的信息  
      */
      switch (Type) {
        case "add":
          num = 1;
          break;
        case "sub":
          num = goodInfo.skuNum > 1 ? -1 : 0;
          break;
        case "input": {
          // input输入框输入的内容可能为NaN，以及小数、负数等等
          // 保存该商品原本的数量
          let oldNum = goodInfo.skuNum;
          // 处理输入内容的非法情况
          if (isNaN(num) || num < 1) {
            num = 0;
          } else {
            // 进入此处说明是合法的，但是可能出现小数
            num = parseInt(num) - oldNum;
          }
          break;
        }
      }
      try {
        // 派发action
        await this.$store.dispatch("getAddOrUpdateSkuNum", {
          skuId: goodInfo.skuId,
          skuNum: num,
        });
        // 重新获取购物车列表最新数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),

    // 删除商品
    async deleteShop(goodInfo) {
      if (confirm("是否确认删除该商品？")) {
        try {
          // 派发action
          let result = await this.$store.dispatch(
            "deleteShopOfCart",
            goodInfo.skuId
          );
          // 重新加载购物车最新数据
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      }
    },

    // 改变商品勾选状态
    async updateChecked(goodInfo, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("changeChecked", {
          skuId: goodInfo.skuId,
          isChecked,
        });
        // 重新获取购物车数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 删除选中商品
    async deleteCheckedGoods() {
      try {
        // 派发一个action
        await this.$store.dispatch("deleteCheckedGoodsOfCart");
        // 重新获取购物车数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 全选
    async checkedAll(isChecked) {
      try {
        isChecked = isChecked ? "1" : "0";
        await this.$store.dispatch("toCheckedAll", isChecked);
        // 重新获取购物车状态
        this.getData()
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    CartList() {
      return this.cartList.cartInfoList || [];
    },
    // 购物车中商品总价
    cartTotalPrice() {
      let totalPrice = this.CartList.reduce(
        (totalPrice, Item) => totalPrice + Item.skuNum * Item.cartPrice,
        0
      );
      return totalPrice;
    },
    isCheckedAll() {
      return this.CartList.every((goods) => goods.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>