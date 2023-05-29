<template>
   <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <!-- 分页器左侧区域 -->
                <li class="prev disabled">
                  <a :aria-disabled="pageNo == 1"  @click="$emit('getPageNo', pageNo-1, totalPage)">«上一页</a>
                </li>
                <li :class="{active : pageNo==1}" v-if= "getStartAndEnd.start > 1 " >
                  <a @click="$emit('getPageNo', 1, totalPage)" >1</a>
                </li>
                <li class="dotted" v-if= "getStartAndEnd.start > 2 "><span>...</span></li>
                <!-- 中间连续页码区域 -->
                <li :class="{active : pageNo== index + 1}" v-for="(word,index) in getStartAndEnd.end" v-if = "index >= getStartAndEnd.start - 1">
                  <a @click="$emit('getPageNo',index+1, totalPage)">{{index+1}}</a>
                </li>
               
                <!-- 分页器右侧区域 -->
                 <li class="dotted" v-if = "getStartAndEnd.end <= totalPage - 2 "><span>...</span></li>
                <li :class="{active : pageNo==totalPage}" v-if= "getStartAndEnd.end <= totalPage - 1">
                  <a @click="$emit('getPageNo',totalPage, totalPage)" >{{totalPage}}</a>
                </li>
                <li class="next">
                  <a :aria-disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo+1, totalPage)">下一页»</a>
                </li>
              </ul>
              <div class="total"><span>共{{total}}条&nbsp;</span></div>
            </div>
          </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed:{
        // 计算出最后一页
        totalPage(){
            return Math.ceil(this.total / this.pageSize)
        },

        // 计算连续页码的start和end
        getStartAndEnd(){
            // 初始化连续页码的开始和结尾
            let start = 0
            let end = 0
            // 解构出数据以便后续使用
            const {pageNo, totalPage, continues} = this
            /* 
                连续页码数可能出现的异常：
                    1. 总的页数 < 连续页码数
                    解决方式： start = 1   end = totalPage

                start、end可能出现的异常情况：
                    1. start < 0或者  start == 0
                    2. end >总页码数totalPage
            */
            start = pageNo - parseInt(continues/2)
            end = pageNo + parseInt(continues/2)
            // 排除总页数小于连续页码数的异常情况
            if(continues > totalPage){
                start = 1
                end = totalPage
            }else{
                // 进入此处说明总页数大于连续页码数
                // 排除start的异常情况
                if(start < 1){
                    start = 1
                    end = continues
                }

                // 排除end异常的情况
                if(end > totalPage){
                    end = totalPage
                    start = totalPage - continues + 1
                }
            }
            return {start,end}
        }
    }

}
</script>

<style scoped lang="less">
.page {
        width: 1000px;
        height: 66px;
        float: right;
        position: relative;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 720px;
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
                  color: #fff;
                  cursor: default;
                  background-color: rgb(10, 140, 192);
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
.total{

    position: absolute;
    right: 10%;
    height: 38px;
    line-height:38px;
}
</style>