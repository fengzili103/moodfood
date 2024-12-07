<template>
  <div>
    <el-date-picker
      v-model="searchDate"
      type="date"
      placeholder="Select date"
      style="margin-bottom: 20px; width: 300px; margin-right: 10px"
    ></el-date-picker>
    <el-button type="primary" @click="search">Search</el-button>

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
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showcomment(scope.$index)"
            >comments</el-button
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
      activeIndex: "1",
      form: {},
      tableData: [],
      searchDate: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search() {},
  },
};
</script>
<style scoped lang="scss">
.pagecontainer {
  width: 100%;
  height: auto;
}
</style>
