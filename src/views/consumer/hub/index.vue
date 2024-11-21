<template>
  <div>
    <section>
      <div class="food">
        <div class="food-in">
          <div class="title">
            <font>-<b> PERSONAL INFORMATION</b>-</font>
          </div>
          <div class="content">
            <el-tabs v-model="activeName">
              <el-tab-pane label="Infor" name="Infor">
                <info></info>
              </el-tab-pane>
              <el-tab-pane label="Order History" name="history">
                <history></history>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {
    history: () => import("./oneHistory.vue"),
    info: () => import("./oneInfo.vue"),
  },
  data() {
    return {
      search: {
        name: "",
      },
      activeName: "Infor",
      tableData: [],
    };
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
    margin-left: 100px;
    width: calc(100% - 200px);
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
    .content {
      width: 70%;
      height: auto;
      min-height: 300px;
      color: #666666;
      font-size: 16px;
      text-align: justify;
      line-height: 25px;
      margin-top: 50px;

      p {
        margin: 10px;
      }
    }
  }
}
</style>
