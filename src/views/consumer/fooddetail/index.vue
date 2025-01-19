<template>
  <div>
    <el-drawer
      title="Spaghetti"
      :visible.sync="drawer"
      direction="rtl"
      size="40%"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          size="small"
          style="width: 100%"
        >
          <el-form-item label="Name">
            <span>{{ form.food_name }}</span>
          </el-form-item>
          <el-form-item label="Price">
            <span>£{{ form.price }}</span>
          </el-form-item>
          <el-form-item label="Ingredients">
            <span>{{ form.ingredients }}</span>
          </el-form-item>

          <el-form-item label="Describe">
            <span>{{ form.description }}</span>
          </el-form-item>
          <el-form-item label="Comments">
            <el-carousel height="250px" type="card">
              <el-carousel-item v-for="(item, index) in comments" :key="index">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>{{ item.user_id }}</span>
                  </div>
                  <div class="text item">
                    {{ item.review }}
                  </div>
                </el-card>
              </el-carousel-item>
            </el-carousel>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { getComment } from "../foodlist/service";
export default {
  components: {},
  data() {
    return {
      drawer: false,
      form: {
        food_name: "",
        price: "",
      },
      comments: [],
    };
  },
  methods: {
    open(data) {
      this.drawer = true;
      if (data) {
        this.form = data;
        getComment({ food_id: data.id }).then((res) => {
          this.comments = res.beans;
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.form {
  padding: 20px;
}
</style>
