<template>
  <div>
    <section>
      <div class="food">
        <div class="food-in">
          <div class="title">
            <font>-<b> FOOD LIST </b>-</font>
            <el-input
              style="margin-top: 20px; width: 280px"
              placeholder="Search by food name"
              v-model="searchdata.food_name"
              class="input-with-select"
              size="small"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
          </div>
          <div class="content" ref="content">
            <div class="content-in">
              <div class="onefood" v-for="(item, index) in list" :key="index">
                <div
                  class="image"
                  :style="{ backgroundImage: 'url(' + item.photo + ')' }"
                >
                  <div class="detail" @click="detail(item)">More</div>
                </div>
                <div class="infor">
                  <div class="name" :title="item.food_name">
                    {{ item.food_name }}
                  </div>
                </div>
                <div class="control">
                  <div class="price">£{{ item.price }}</div>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-shopping-cart-1"
                    @click="purchase($event, item)"
                    >Add yo Cart</el-button
                  >
                </div>
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
                :current-page="pageOtiopns.page"
                :page-size="pageOtiopns.size"
                @current-change="handlePageChange"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
import { get, getInfo } from "./service";
import $ from "jquery";
export default {
  components: {
    detail: () => import("../fooddetail/index.vue"),
  },
  data() {
    return {
      searchdata: {
        food_name: "",
      },
      list: [],
      pageOtiopns: {
        page: 1,
        size: 10,
      },
    };
  },
  mounted() {
    if (this.$route.query.foodid) {
      this.queryOneFood();
    } else {
      this.search();
    }
    window.reloadfoodlist = this.queryOneFood;
  },
  beforeDestroy() {},
  methods: {
    queryOneFood() {
      getInfo({ id: this.$route.query.foodid }).then((res) => {
        this.list = [res.bean];
      });
    },
    search() {
      let param = {
        page: this.pageOtiopns.page,
        size: this.pageOtiopns.size,
        food_name: this.searchdata.food_name,
      };
      get(param).then((res) => {
        this.list = res.beans;
      });
    },
    purchase(event, item) {
      window.addCartReal(item);
      const button = $(event.target);
      const cart = $("#amount");
      const bull = $('<div class="red-bull"></div>');

      $("body").append(bull);

      bull.css({
        top: button.offset().top,
        left: button.offset().left,
      });

      bull.animate(
        {
          top: cart.offset().top,
          left: cart.offset().left,
        },
        1500,
        function () {
          bull.remove();
          window.addCart();
        }
      );
    },

    detail(item) {
      this.$refs.detail.open(item);
    },
    setContentHeight() {
      const content = this.$refs.content;
      if (content) {
        content.style.height = `${window.innerHeight - 260}px`;
      }
    },
    handlePageChange(page) {
      this.pageOtiopns.page = page;
      this.search();
    },
  },
};
</script>

<style>
.red-bull {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #ca0000;
  border-radius: 50%;
  z-index: 2000;
}
</style>
<style scoped lang="scss">
.oneimage {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  background-image: url("../../../assets/images/banner.jpg.webp");
}
.food {
  width: 100%;
  min-height: 300px;
  height: auto;
  background-color: #f8eee2;
  .food-in {
    margin-left: 100px;
    width: calc(100% - 100px);
    height: auto;
    display: flex;
    .title {
      width: 30%;
      height: 300px;
      font-size: 40px;
      color: #ca0000;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .content {
      width: 70%;

      color: #666666;
      font-size: 16px;
      text-align: justify;
      line-height: 25px;
      margin-top: 50px;

      .content-in {
        width: 100%;
        height: auto;
        padding-right: 100px;
      }
      .pagination {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
        padding-right: 100px;
      }
      .onefood {
        width: calc(25% - 10px);
        margin-left: 10px;
        height: auto;
        margin-bottom: 40px;
        float: left;
        .image {
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
          height: 200px;
          border: 2px solid #ca0000;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("../../../assets/images/food.webp");
          &:hover {
            .detail {
              opacity: 1;
            }
          }
          .detail {
            width: 100%;
            height: 100%;
            background-color: #ca00005d;
            color: white;
            cursor: pointer;
            opacity: 0;
            transition: all 0.5s;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .infor {
          width: 100%;
          height: 40px;
          line-height: 40px;
          align-items: center;
          font-size: 14px;
          color: #ca0000;
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .control {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            display: block;
            background-color: #f56c6c;
            color: white;
            padding: 3px;
            border-radius: 2px;
            font-size: 12px;
            padding-top: 1px;
            padding-bottom: 1px;
          }
        }
      }
      p {
        margin: 10px;
      }
    }
  }
}
</style>
