<template>
  <div>
    <section>
      <div class="food">
        <div class="food-in">
          <div class="content" ref="content">
            <el-input
              placeholder="Search by food name"
              v-model="searchdata.name"
              class="input-with-select"
              size="small"
              clearable
              style="width: auto; margin-bottom: 10px"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
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
                <el-table-column label="operate" width="300px">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="message(scope.row)"
                      >leave message</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="manage(scope.row)"
                      >manage my message</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <commentlist ref="commentlist"></commentlist>
  </div>
</template>
<script>
import { history, leavemessage } from "./service";
export default {
  components: {
    commentlist: () => import("./commentlist.vue"),
  },
  data() {
    return {
      searchdata: {
        name: "",
        order_state: "2",
        customer_id: "",
      },
      tableData: [],
    };
  },
  mounted() {
    this.search();
    this.searchdata.customer_id = JSON.parse(
      sessionStorage.getItem("userinfor")
    ).id;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setContentHeight);
  },
  methods: {
    manage(row) {
      this.$refs.commentlist.show(row);
    },
    message(row) {
      this.$prompt("Please leave a message", "Leave message", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        inputPattern: /\S/,
        inputErrorMessage: "Please enter a message",
      })
        .then(({ value }) => {
          leavemessage({
            user_id: JSON.parse(sessionStorage.getItem("userinfor")).id,
            review: value,
            food_id: row.id,
          }).then(() => {
            this.$message({
              type: "success",
              message: "Leave message successfully",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel",
          });
        });
    },
    search() {
      history(this.searchdata).then((res) => {
        this.tableData = res.beans;
      });
    },
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
