<template>
  <div>
    <section>
      <div class="food">
        <div class="food-in">
          <div class="title">
            <font>-<b> CART </b>-</font>
            <el-input
              style="margin-top: 20px; width: 280px"
              placeholder="Search by food name"
              v-model="searchdata.name"
              class="input-with-select"
              size="small"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
          </div>
          <div class="content" ref="content">
            <el-button
              type="danger"
              size="mini"
              @click="checkout"
              style="margin-bottom: 10px"
              >Checkout</el-button
            >
            <div class="content-in">
              <el-table
                show-summary
                :data="filteredData"
                stripe
                style="width: 100%"
              >
                <el-table-column prop="date" label="Date"> </el-table-column>
                <el-table-column prop="name" label="Name"> </el-table-column>
                <el-table-column prop="price" label="price(£)">
                </el-table-column>
                <el-table-column prop="status" label="status">
                </el-table-column>
                <el-table-column label="Action">
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      @click="handleDelete(scope.$index, scope.row)"
                    >
                      Delete
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import $ from "jquery";
import { checkout, insert } from "./service";
export default {
  components: {},
  data() {
    return {
      searchdata: {
        name: "",
      },
      tableData: [],
      filteredData: [],
    };
  },
  mounted() {
    this.refresh();
    this.search();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.refresh();
    });
  },
  beforeDestroy() {},
  methods: {
    findSuggest() {
      let commuication = [];
      let generalinfor = window.getGeneralInfo();
      console.log(this.tableData, this.filteredData);
      this.tableData.forEach((item) => {
        console.log(item.id, $("[food-id='" + item.id + "']").length);
        if ($("[food-id='" + item.id + "']").length != 0) {
          let chats = window.getContent();
          console.log(chats);
          for (let i = 0; i < chats.length; i++) {
            chats[i].sessionid = generalinfor.sessionid;
            chats[i].customer_id = generalinfor.customer_id;
            chats[i].food_id = item.id;
          }
          commuication = chats;
        }
      });
      insert(commuication);
    },
    checkout() {
      if (this.tableData.length === 0) {
        this.$message({
          type: "info",
          message: "Cart is empty",
        });
        return;
      }
      this.$confirm("Are you sure to checkout?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$prompt("Please enter your other requests", "Checkout", {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
          })
            .then(({ value }) => {
              this.findSuggest();
              if (value === null) {
                value = "";
              }
              let param = {
                customer_id: JSON.parse(sessionStorage.getItem("userinfor")).id,
                remark: value,
                food_ids: [],
              };
              for (let i = 0; i < this.tableData.length; i++) {
                param.food_ids.push(this.tableData[i].id);
              }
              param.food_ids = param.food_ids.toString();
              checkout(param).then(() => {
                this.tableData = [];
                window.clearCart();
                this.$message({
                  type: "success",
                  message:
                    "Checkout successfully, you can check the order in the order list",
                });
                this.tableData = [];
                this.search();
                if (($(".foodlist"), length > 0)) {
                  console.log("refresh");
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "Checkout canceled",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Checkout canceled",
          });
        });
    },
    search() {
      if (this.searchdata.name === "") {
        this.filteredData = this.tableData;
        return;
      }
      console.log(this.filteredData);
      this.filteredData = this.tableData.filter((item) =>
        item.name.toLowerCase().includes(this.searchdata.name.toLowerCase())
      );
    },
    refresh() {
      this.tableData = [];
      let cart = window.getCart();
      for (let i = 0; i < cart.length; i++) {
        this.addFoodTable(cart[i]);
      }
      this.search();
      console.log(this.tableData);
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      window.deleteCart(row.id);
    },
    addFoodTable(data) {
      let row = {
        id: data.id,
        date: data.date,
        name: data.food_name,
        price: data.price,
        status: "Waiting for checkout",
      };
      this.tableData.push(row);
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
