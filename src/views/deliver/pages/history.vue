<template>
  <div>
    <el-input
      v-model="searchdata.food_name"
      placeholder="Search by name"
      style="margin-bottom: 20px; margin-right: 10px; width: 300px"
    ></el-input>
    <el-button type="primary" @click="search" size="small">Search</el-button>

    <el-table :data="tableData" stripe style="width: 100%" show-summary>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-card>
            <el-table :data="props.row.foods" stripe style="width: 100%">
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
              <el-table-column prop="price" label="Price(£)"> </el-table-column>
            </el-table>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column prop="order_time" label="Order Date"> </el-table-column>
      <el-table-column prop="order_amount" label="Total price(£)">
      </el-table-column>
      <el-table-column prop="remark" label="Order Comment"> </el-table-column>>
    </el-table>
  </div>
</template>
<script>
import { history } from "./service.js";
export default {
  components: {},
  data() {
    return {
      searchdata: { food_name: "", order_state: "2" },
      tableData: [],
      searchDate: "",
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      history(this.searchdata).then((res) => {
        this.tableData = res.beans;
        console.log(this.tableData);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.pagecontainer {
  width: 100%;
  height: auto;
}
</style>
