<template>
  <div>
    <el-input
      v-model="searchdata.food_name"
      placeholder="Search by name"
      style="margin-bottom: 20px; margin-right: 10px; width: 300px"
    ></el-input>
    <el-button type="primary" @click="search" size="small">Search</el-button>
    <el-button size="small" @click="add">ADD NEW</el-button>

    <el-table :data="tableData" stripe style="width: 100%" :height="height">
      <el-table-column label="Image">
        <template slot-scope="scope">
          <img :src="scope.row.photo" alt="Food Image" class="food-image" />
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="Date"> </el-table-column>
      <el-table-column prop="food_name" label="Name"> </el-table-column>
      <el-table-column prop="price" label="Price(£)"> </el-table-column>
      <el-table-column prop="ingredients" label="Ingredients">
      </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)"
            >edit</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >remove</el-button
          >
          <el-button type="text" size="small" @click="showcomment(scope.row)"
            >comments</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <edit ref="edit"></edit>
    <comments ref="comments"></comments>
  </div>
</template>
<script>
import { foodlist as get, del } from "./service";
export default {
  components: {
    edit: () => import("./edit.vue"),
    comments: () => import("./comments.vue"),
  },
  data() {
    return {
      height: 200,
      searchdata: {
        food_name: "",
      },
      pageOtiopns: {
        page: 1,
        size: 10,
      },

      tableData: [],
    };
  },
  created() {
    this.setDynamicHeight();
  },
  mounted() {
    window.addEventListener("resize", this.setDynamicHeight);
    this.search();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setDynamicHeight);
  },
  methods: {
    setDynamicHeight() {
      this.height = window.innerHeight - 200;
      this.$forceUpdate();
    },
    search() {
      let param = {
        page: this.pageOtiopns.page,
        size: this.pageOtiopns.size,
        food_name: this.searchdata.food_name,
      };
      get(param).then((res) => {
        this.tableData = res.beans;
      });
    },
    add() {
      this.$refs.edit.add();
    },
    handlePageChange(page) {
      this.pageOtiopns.page = page;
      this.search();
    },
    showcomment(row) {
      this.$refs.comments.show(row);
    },
    edit(row) {
      this.$refs.edit.edit(row);
    },
    remove(row) {
      this.$confirm("Are you sure to delete this food?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          del({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "Delete successfully",
            });
            this.search();
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="scss">
.food-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
.pagecontainer {
  width: 100%;
  height: auto;
}
</style>
