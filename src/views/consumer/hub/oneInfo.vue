<template>
  <el-form
    :model="form"
    ref="form"
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="Avatar">
      <el-upload
        style="display: flex; align-items: center; justify-content: center"
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="handleAvatarChange"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Phone" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Save</el-button>
      <el-button @click="onReset">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        avatar: "",
        avatarFile: null,
        name: "",
        phone: "",
        address: "",
        email: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please input your phone number",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "Please input your address",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input a valid email address",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    handleAvatarChange(file) {
      this.form.avatar = URL.createObjectURL(file.raw);
      this.form.avatarFile = file.raw;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append("avatar", this.form.avatarFile);
          formData.append("name", this.form.name);
          formData.append("phone", this.form.phone);
          formData.append("address", this.form.address);
          formData.append("email", this.form.email);

          //   fetch("", {
          //     method: "POST",
          //     body: formData,
          //   })
          //     .then((response) => response.json())
          //     .then((data) => {
          //       alert("Submit successful!");
          //     })
          //     .catch((error) => {
          //       console.error("Error:", error);
          //     });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onReset() {
      this.$refs.form.resetFields();
      this.form.avatar = "";
      this.form.avatarFile = null;
    },
  },
};
</script>

<style scoped>
.avatar-uploader {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
