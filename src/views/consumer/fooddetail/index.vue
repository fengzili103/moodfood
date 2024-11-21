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
            <span>{{ form.name }}</span>
          </el-form-item>
          <el-form-item label="Price">
            <span>£{{ form.price }}</span>
          </el-form-item>
          <el-form-item label="Describe">
            <span>{{ form.describe }}</span>
          </el-form-item>
          <el-form-item label="Comments">
            <el-carousel height="250px" type="card">
              <el-carousel-item
                v-for="(item, index) in form.comments"
                :key="index"
              >
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="text item">
                    {{ item.comment }}
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
export default {
  components: {},
  data() {
    return {
      drawer: false,
      form: {
        name: "Spaghetti",
        price: "10",
        describe:
          "Spaghetti is a long, thin, solid, cylindrical pasta. It is a staple food of traditional Italian cuisine.",
        comments: [
          {
            name: "John Doe",
            comment:
              "I love Spaghetti! It’s one of my favorite Italian dishes. The price is also very reasonable. I’ll take two packets, please.",
          },
          {
            name: "Jane Smith",
            comment:
              "I’ve been craving Spaghetti for days. Finally found it here. The quality looks great and the price is just perfect. I’ll definitely buy it.",
          },
          {
            name: "Michael Johnson",
            comment:
              "Spaghetti is always a hit at my house. My family loves it. This price is a steal compared to other brands. I’ll grab a few packets.",
          },
          {
            name: "Emily Brown",
            comment:
              "I’m a big fan of Italian cuisine, and Spaghetti is a must-have. The price is very attractive, and I can’t wait to try it. I’ll take one packet.",
          },
          {
            name: "David Wilson",
            comment:
              "Heard so much about Spaghetti and finally found it here. Looks delicious! And the price is just right. I’m definitely going to purchase it.",
          },
        ],
      },
    };
  },
  methods: {
    open(data) {
      this.drawer = true;
      if (data) {
        this.form = data;
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
