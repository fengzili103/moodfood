<template>
  <div>
    <el-input
      v-model="searchQuery"
      placeholder="Search by name"
      style="margin-bottom: 20px; margin-right: 10px; width: 300px"
    ></el-input>
    <el-button type="primary" @click="search" size="small">Search</el-button>
    <el-button size="small" @click="add">ADD NEW</el-button>

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
          <el-button type="text" size="small" @click="edit(scope.$index)"
            >edit</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.$index)"
            >remove</el-button
          >
          <el-button type="text" size="small" @click="showcomment(scope.$index)"
            >comments</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <edit ref="edit"></edit>
  </div>
</template>
<script>
export default {
  components: {
    edit: () => import("./edit.vue"),
  },
  data() {
    return {
      activeIndex: "1",
      form: {},
      searchQuery: "",
      tableData: [
        {
          date: "2023-10-01",
          name: "Food Item 1",
          price: 10,
          describe: "Delicious food item 1",
          image: "https://example.com/image1.jpg",
        },
        {
          date: "2023-10-02",
          name: "Food Item 2",
          price: 15,
          describe: "Delicious food item 2",
          image: "https://example.com/image2.jpg",
        },
        {
          date: "2023-10-03",
          name: "Food Item 3",
          price: 20,
          describe: "Delicious food item 3",
          image: "https://example.com/image3.jpg",
        },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search() {},
    add() {
      this.$refs.edit.add();
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
