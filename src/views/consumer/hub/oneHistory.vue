<template>
  <div>
    <section>
      <div class="food">
        <div class="food-in">
          <div class="content" ref="content">
            <div class="content-in">
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="date" label="Date"> </el-table-column>
                <el-table-column prop="name" label="Name"> </el-table-column>
                <el-table-column prop="price" label="price(£)">
                </el-table-column>
                <el-table-column prop="status" label="status">
                </el-table-column>
                <el-table-column prop="message" label="message">
                </el-table-column>
                <el-table-column label="operate">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="message(scope.$index)"
                      >leave message</el-button
                    >
                  </template>
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
          message: "good",
        },
        {
          name: "Spaghetti",
          date: "2021-09-01 00:00:00",
          price: "10",
          status: "processing",
          message: "good",
        },
        {
          name: "Spaghetti",
          date: "2021-09-01 00:00:00",
          price: "10",
          status: "processing",
          message: "good",
        },
      ],
    };
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener("resize", this.setContentHeight);
  },
  methods: {
    message() {},
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
    width: calc(100%);
    height: auto;
    display: flex;

    .content-in {
      width: 100%;
      height: auto;
    }
    .pagination {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;
    }
    .content {
      width: 100%;

      color: #666666;
      font-size: 16px;
      text-align: justify;
      line-height: 25px;
    }
  }
}
</style>
