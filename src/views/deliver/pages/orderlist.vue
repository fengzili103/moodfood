<template>
  <div>
    <el-button type="primary" @click="search" style="margin-bottom: 20px"
      >Reload</el-button
    >
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
      <el-table-column prop="remark" label="Order Comment"> </el-table-column>
      <el-table-column label="Status">
        <template slot-scope="scope">
          {{ findStatus(scope.row.order_state) }}
        </template>
      </el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="complete(scope.row)"
            >Complete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { orderlist as get, updatelist } from "./service";
import { getStatus } from "@/utils/tool";
export default {
  components: {},
  data() {
    return {
      searchdata: {
        food_name: "",
        order_state: "5",
      },
      form: {},
      tableData: [],
      selectedStatus: "",
      currentRow: "",
      dialogVisible: false,
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    findStatus(index) {
      return getStatus(index);
    },
    search() {
      get(this.searchdata).then((res) => {
        this.tableData = res.beans;
      });
    },
    complete(row) {
      this.currentRow = row;
      this.selectedStatus = row.order_state;
      this.confirmChangeStatus();
    },
    confirmChangeStatus() {
      if (this.currentRow) {
        updatelist({
          id: this.currentRow.id,
          order_state: "2",
        }).then(() => {
          this.search();

          this.$message({
            type: "success",
            message: `Status changed!`,
          });
          this.dialogVisible = false;
        });
      }
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
