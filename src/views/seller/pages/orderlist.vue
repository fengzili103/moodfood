<template>
  <div>
    <el-button type="primary" @click="search" style="margin-bottom: 20px"
      >Reload</el-button
    >
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      show-summary
      :height="height"
    >
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
          <el-button type="text" size="small" @click="change(scope.row)"
            >change status</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="Image">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="Food Image" class="food-image" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Date"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="price" label="Price(£)"> </el-table-column>
      <el-table-column prop="describe" label="Describe"> </el-table-column>
      <el-table-column prop="status" label="Status"> </el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="change(scope.$index)"
            >change status</el-button
          >
        </template>
      </el-table-column>
    </el-table> -->
    <el-dialog :visible.sync="dialogVisible" title="Change Status">
      <div>
        <span>Please select the new status:</span>
        <el-select
          v-model="selectedStatus"
          placeholder="Select Status"
          style="margin-top: 10px; width: 100%"
        >
          <el-option label="Order Sent" :value="1"></el-option>
          <el-option label="Order Cancelled" :value="3"></el-option>
          <el-option label="In Production" :value="4"></el-option>
          <el-option label="In Delivery" :value="5"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            selectedStatus = '';
          "
          >Cancel</el-button
        >
        <el-button type="primary" @click="confirmChangeStatus"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { orderlist as get, updatelist } from "./service";
import { getStatus } from "@/utils/tool";
export default {
  components: {},
  data() {
    return {
      height: 200,
      searchdata: {
        food_name: "",
        order_state: "1,3,4,5",
      },
      form: {},
      tableData: [],
      selectedStatus: "",
      currentRow: "",
      dialogVisible: false,
    };
  },
  created() {
    this.setDynamicHeight();
  },
  mounted() {
    this.search();
  },
  methods: {
    setDynamicHeight() {
      this.height = window.innerHeight - 200;
      this.$forceUpdate();
    },
    findStatus(index) {
      return getStatus(index);
    },
    search() {
      get(this.searchdata).then((res) => {
        this.tableData = res.beans;
      });
    },
    change(row) {
      this.currentRow = row;
      this.selectedStatus = row.order_state;
      this.dialogVisible = true;
    },
    confirmChangeStatus() {
      if (this.currentRow) {
        updatelist({
          id: this.currentRow.id,
          order_state: this.selectedStatus,
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
