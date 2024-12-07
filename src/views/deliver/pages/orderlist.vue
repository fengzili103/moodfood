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
          <el-button
            type="text"
            size="small"
            @click="confirmDelivery(scope.$index)"
            >Deliverd</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
    };
  },
  methods: {
    search() {},
    confirmDelivery(row) {
      this.$confirm(
        "Are you sure you want to mark this food as delivered?",
        "Confirm Delivery",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
        }
      )
        .then(() => {
          row.status = "Delivered";
          this.$message({
            type: "success",
            message: "The food has been marked as delivered!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delivery canceled",
          });
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
