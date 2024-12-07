<template>
  <div>
    <el-date-picker
      v-model="searchDate"
      type="date"
      placeholder="Select date"
      style="margin-bottom: 20px; width: 300px; margin-right: 10px"
    ></el-date-picker>
    <el-button type="primary" @click="search">Search</el-button>
    <el-button>ADD NEW</el-button>

    <el-table :data="tableData" stripe style="width: 100%">
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
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="Change Status">
      <div>
        <span>Please select the new status:</span>
        <el-select
          v-model="selectedStatus"
          placeholder="Select Status"
          style="margin-top: 10px; width: 100%"
        >
          <el-option label="Cooking" value="Cooking"></el-option>
          <el-option label="Delivering" value="Delivering"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmChangeStatus"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchDate: "",
      activeIndex: "1",
      form: {},
      tableData: [{}],
      selectedStatus: "",
      currentRow: "",
      dialogVisible: false,
    };
  },
  methods: {
    search() {},
    change(row) {
      this.currentRow = row;
      this.selectedStatus = row.status; // 初始化选择的状态
      this.dialogVisible = true; // 打开对话框
    },
    confirmChangeStatus() {
      if (this.currentRow) {
        this.currentRow.status = this.selectedStatus;
        this.$message({
          type: "success",
          message: `Status changed to ${this.selectedStatus}!`,
        });
        this.dialogVisible = false; // 关闭对话框
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
