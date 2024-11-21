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
              v-model="search.name"
              class="input-with-select"
              size="small"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="content" ref="content">
            <div class="content-in">
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="date" label="Date"> </el-table-column>
                <el-table-column prop="name" label="Name"> </el-table-column>
                <el-table-column prop="price" label="price(£)">
                </el-table-column>
                <el-table-column prop="status" label="status">
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      search: {
        name: "",
      },
      tableData: [
        {
          name: "Spaghetti",
          date: "2021-09-01 00:00:00",
          price: "10",
          status: "processing",
        },
        {
          name: "Spaghetti",
          date: "2021-09-01 00:00:00",
          price: "10",
          status: "processing",
        },
        {
          name: "Spaghetti",
          date: "2021-09-01 00:00:00",
          price: "10",
          status: "processing",
        },
      ],
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
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
