<template>
  <div>
    <section>
      <div class="food">
        <div class="food-in">
          <div class="title">
            <font>-<b> CURRENT ORDERS </b>-</font>
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
              <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                show-summary
              >
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-card>
                      <el-table
                        :data="props.row.foods"
                        stripe
                        style="width: 100%"
                      >
                        <el-table-column prop="food_name" label="Food Name">
                        </el-table-column>
                        <el-table-column label="Food Picture">
                          <template slot-scope="scope">
                            <img
                              :src="scope.row.photo"
                              alt="Food Picture"
                              style="width: 100px; height: 100px"
                            />
                          </template>
                        </el-table-column>
                        <el-table-column prop="price" label="Price(£)">
                        </el-table-column>
                      </el-table>
                    </el-card>
                  </template>
                </el-table-column>
                <el-table-column prop="order_time" label="Order Date">
                </el-table-column>
                <el-table-column prop="order_amount" label="Total price(£)">
                </el-table-column>
                <el-table-column prop="remark" label="Order Comment">
                </el-table-column>
                <el-table-column label="Status">
                  <template slot-scope="scope">
                    {{ findStatus(scope.row.order_state) }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { get } from "./service";
import { getStatus } from "@/utils/tool";
export default {
  components: {},
  data() {
    return {
      searchdata: {
        food_name: "",
        customer_id: JSON.parse(sessionStorage.getItem("userinfor")).id,
        order_state: "0,1,4,5",
      },
      tableData: [],
    };
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.search();
    });
  },
  beforeDestroy() {},
  methods: {
    findStatus(index) {
      return getStatus(index);
    },
    search() {
      get(this.searchdata).then((res) => {
        this.tableData = res.beans;
      });
    },
  },
};
</script>
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

    .content-in {
      width: 100%;
      height: auto;
      overflow-x: hidden;
      overflow-y: auto;
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
    .content {
      width: 70%;

      color: #666666;
      font-size: 16px;
      text-align: justify;
      line-height: 25px;
      margin-top: 50px;
    }
  }
}
</style>
