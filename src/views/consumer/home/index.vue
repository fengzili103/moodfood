<template>
  <div>
    <el-carousel height="700px">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="oneimage" :class="'i' + item"></div>
      </el-carousel-item>
    </el-carousel>
    <section>
      <div class="about">
        <div class="about-in">
          <div class="title">
            <font>-<b> ABOUT US </b>-</font>
          </div>
          <div class="content">
            <p>
              Welcome to Chef Simon, your ultimate destination for delicious
              meals delivered right to your door. At Chef Simon, we believe that
              food is not just about satisfying hunger; it’s about creating an
              experience that caters to your emotions and culinary desires.
            </p>
            <p>
              While we offer all the conventional features you’d expect from a
              top-tier meal ordering platform, Chef Simon goes beyond the
              ordinary. We understand that what you crave can often be as
              unpredictable as your mood. That’s why we’ve introduced our unique
              “Mood-Based Dining” feature. Whether you’re feeling adventurous,
              nostalgic, or in need of comfort, Chef Simon provides personalized
              meal suggestions that match your current mood. With a wide array
              of options, we ensure that every meal you choose will perfectly
              complement your state of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="topfood">
        <div class="topfood-in">
          <div class="content">
            <div
              class="block"
              style="margin-top: 70px"
              v-for="(item, index) in dishes"
              :key="index"
            >
              <div
                class="foodimg"
                :style="{ 'background-image': `url(${item.photo})` }"
              ></div>
            </div>
          </div>
          <div class="title">
            <font>-<b> TODAY TOP 5 </b>-</font>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="contact">
        <div class="contact-in">
          <div class="title">
            <font>-<b> CONTACT </b>-</font>
          </div>
          <p class="tip">
            If you have any questions or concerns, please feel free to contact
            us. We are always here to help you.
          </p>
          <div class="content">
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
              size="small"
              style="width: 100%"
            >
              <el-form-item label="Name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="Phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="Content">
                <el-input type="textarea" v-model="form.content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  @click="onSubmit"
                  style="width: 100%; margin-bottom: 50px"
                  >Send</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { get } from "./service";
export default {
  components: {},
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
        content: "",
      },
      dishes: [],
    };
  },
  mounted() {
    setTimeout(() => {
      get({ food_name: "", page: 1, size: 5 }).then((res) => {
        this.dishes = res.beans;
        console.log(res);
      });
    }, 1000);
  },
  methods: {
    onSubmit() {
      this.form = {
        name: "",
        phone: "",
        email: "",
        content: "",
      };
      this.$message({
        message: "Your message has been sent successfully!",
        type: "success",
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
  &.i1 {
    background-image: url("../../../assets/images/2.jpg");
  }
  &.i2 {
    background-image: url("../../../assets/images/1.jpg");
  }
  &.i3 {
    background-image: url("../../../assets/images/3.jpg");
  }
  &.i4 {
    background-image: url("../../../assets/images/4.jpg");
  }
}
.about {
  width: 100%;
  height: 400px;
  background-color: #f8eee2;
  .about-in {
    margin-left: 100px;
    width: calc(100% - 200px);
    height: 100%;
    display: flex;
    .title {
      width: 30%;
      height: 100%;
      font-size: 40px;
      color: #ca0000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      width: 70%;
      height: 100%;
      color: #666666;
      font-size: 16px;
      text-align: justify;
      display: flex;
      align-items: center;
      line-height: 25px;
      flex-direction: column;
      justify-content: center;
      p {
        margin: 10px;
      }
    }
  }
}
.topfood {
  width: 100%;
  height: 400px;
  background-color: #262626;
  .topfood-in {
    margin-left: 100px;
    width: calc(100% - 200px);
    height: 100%;
    display: flex;
    .title {
      width: 30%;
      height: 100%;
      font-size: 40px;
      color: #ca0000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      width: 70%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .block {
        width: 120px;
        height: 120px;
        border: 3px solid #ca0000;

        transform: rotate(45deg);
        overflow: hidden;
        background-color: white;
        .foodimg {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("../../../assets/images/food.webp");
          transform: rotate(-45deg) scale(1.5);
        }
      }
      p {
        margin: 10px;
      }
    }
  }
}
.contact {
  width: 100%;
  min-height: 100px;
  height: auto;
  background-color: #f8eee2;
  .contact-in {
    margin-left: 100px;
    width: calc(100% - 200px);
    height: auto;
    .title {
      width: 100%;
      height: 200px;
      font-size: 40px;
      color: #ca0000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tip {
      font-size: 12px;
      color: #ca0000;
      width: 100%;
      text-align: center;
      margin-top: -20px;
    }
    .content {
      width: 50%;
      margin-left: 25%;
      height: auto;
      min-height: 300px;
      color: #666666;
      font-size: 16px;
      text-align: justify;
      display: flex;
      align-items: center;
      line-height: 25px;
      flex-direction: column;
      justify-content: center;
      p {
        margin: 10px;
      }
    }
  }
}
</style>
