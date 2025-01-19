<template>
  <div class="login-container">
    <video autoplay muted loop id="bg-video">
      <source src="@/assets/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Register</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          type="text"
          size="large"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="password"
          size="large"
        />
      </el-form-item>
      <el-form-item prop="phone_number">
        <el-input
          v-model="loginForm.phone_number"
          placeholder="phone"
          type="text"
          size="large"
        />
      </el-form-item>
      <el-form-item prop="address">
        <el-input
          v-model="loginForm.address"
          placeholder="address"
          type="text"
          size="large"
        />
      </el-form-item>

      <el-dialog
        title="Disclaimer"
        :visible.sync="dialogVisible"
        width="50%"
        append-to-body
      >
        <p>
          Welcome to Chef Simon, a new and innovative emotion-based ordering
          platform designed to enhance user satisfaction and platform loyalty.
          Before using our services, please read the following disclaimer
          carefully.
        </p>
        <p>1. Registration and Use</p>
        <p>
          By registering and using the Chef Simon platform, you agree to the
          terms and conditions outlined herein. We reserve the right to modify
          these terms at any time without prior notice. It is your
          responsibility to review these terms periodically to ensure continued
          compliance.
        </p>
        <p>2. Accuracy of Information</p>
        <p>
          Chef Simon strives to provide accurate and reliable information
          through its platform. However, we do not guarantee the accuracy,
          completeness, or reliability of any content, recommendations, or data
          provided. We shall not be liable for any errors or omissions in the
          content or for the availability of the platform. The platform is
          provided “as is” without any warranties, express or implied.
        </p>
        <p>3. Privacy Policy</p>
        <p>
          We take your privacy seriously. We will collect and use your personal
          information in accordance with our Privacy Policy. Please review the
          Privacy Policy for details on how we collect, use, and protect your
          information. By using our platform, you consent to the collection and
          use of your data as described in the Privacy Policy.
        </p>
        <p>4. Emotion Recognition and Data Analysis</p>
        <p>
          Chef Simon uses advanced emotion recognition and document similarity
          algorithms to enhance the user experience. We analyze the content of
          your interactions with the chat window to provide personalized dish
          recommendations. While we take reasonable measures to ensure the
          accuracy and fairness of these algorithms, we cannot guarantee their
          performance or outcomes. Your feedback is valuable to us and helps
          improve our system.
        </p>
        <p>5. User Conduct</p>
        <p>
          You are responsible for all activities that occur under your account.
          You agree not to use the platform for any illegal or unauthorized
          purposes. We reserve the right to suspend or terminate your account if
          we determine that you are not complying with our terms and conditions.
        </p>
        <p>6. External Links</p>
        <p>
          The Chef Simon platform may contain links to external websites. We are
          not responsible for the content or practices of these sites. We
          encourage you to review the privacy policies and terms of use of any
          external sites you visit.
        </p>
        <p>7. Intellectual Property</p>
        <p>
          All content on the Chef Simon platform, including but not limited to
          text, graphics, logos, and images, is the property of Chef Simon and
          is protected by international copyright laws. You may not reproduce,
          distribute, or use any content from this platform without prior
          written permission.
        </p>
        <p>8. Limitation of Liability</p>
        <p>
          Chef Simon shall not be liable for any direct, indirect, incidental,
          special, or consequential damages, including but not limited to
          damages for loss of profits, goodwill, use, data, or other intangible
          losses, arising out of or in connection with the use of or inability
          to use the platform.
        </p>
        <p>9. Indemnification</p>
        <p>
          You agree to indemnify and hold Chef Simon and its affiliates,
          officers, agents, and employees harmless from any claims, demands, or
          damages, including reasonable attorneys’ fees, asserted by any third
          party due to or arising out of your use of the platform, your
          violation of these terms, or your violation of any rights of another.
        </p>
        <p>10. Governing Law</p>
        <p>
          These terms and any disputes arising from them shall be governed by
          and construed in accordance with the laws of [Jurisdiction]. Any legal
          action or proceeding arising from or related to these terms or the
          platform shall be brought exclusively in the courts of [Jurisdiction].
        </p>
        <p>11. Contact Information</p>
        <p>
          If you have any questions or concerns about these terms or the
          platform, please contact us at [Contact Information].
        </p>
        <p>
          By registering and using the Chef Simon platform, you acknowledge that
          you have read, understood, and agreed to these terms and conditions.
        </p>
      </el-dialog>

      <el-button
        :loading="loading"
        type="danger"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        size="large"
        >Create</el-button
      >
      <div style="display: flex; justify-content: space-between">
        <el-link type="danger" size="mini" @click="dialogVisible = true"
          >Terms</el-link
        >
        <el-link type="danger" size="mini" @click="cancel">Cancel</el-link>
      </div>
    </el-form>
    <div class="largelogo"></div>
  </div>
</template>
<script>
import { register } from "./service.js";
export default {
  name: "loginPage",
  data() {
    return {
      dialogVisible: false,
      loginForm: {
        username: "",
        password: "",
        phone_number: "",
        address: "",
        user_type: "1",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
        phone_number: [{ required: true, trigger: "blur" }],
        address: [{ required: true, trigger: "blur" }],
      },
      loading: false,
    };
  },

  methods: {
    cancel() {
      this.$router.go(-1);
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          register(this.loginForm).then(() => {
            this.$message({
              message: "Register successfully",
              type: "success",
            });
            this.$router
              .push({
                path: "/loginConsumer",
              })
              .catch(() => {});
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;

  background-color: #f8eee2;

  overflow: hidden;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  #bg-video {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
    background-size: cover;
  }

  .login-form {
    position: relative;
    width: 320px;
    overflow: hidden;
    left: 250px;
    position: absolute;
    z-index: 1;
    background-color: #f8eee2aa;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    padding: 30px;
  }
  .largelogo {
    position: absolute;
    width: 400px;
    height: 400px;
    top: calc(50% - 200px);
    left: 50%;
    background-image: url("../../../assets/images/logo2.png");
    background-size: contain;
  }
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: #f56c6c;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;

    font-weight: bold;
  }
}
</style>
