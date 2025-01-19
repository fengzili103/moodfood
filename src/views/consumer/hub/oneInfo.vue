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
        :auto-upload="false"
        action=""
      >
        <img v-if="form.photo" :src="form.photo" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="Name" prop="username">
      <el-input v-model="form.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="phone_number" prop="phone_number">
      <el-input v-model="form.phone_number"></el-input>
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Save</el-button>
      <el-button @click="onReset">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { get, editinfo } from "./service";
export default {
  data() {
    return {
      form: {
        id: "",
        photo: "",
        avatarFile: null,
        username: "",
        phone_number: "",
        address: "",
        password: "",
        user_type: "1",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please input your username",
            trigger: "blur",
          },
        ],
        phone_number: [
          {
            required: true,
            message: "Please input your phone number",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
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
      },
    };
  },
  mounted() {
    const userInfo = sessionStorage.getItem("userinfor");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      get({ id: user.id }).then((response) => {
        this.form = { ...this.form, ...response.bean };
      });
    }
  },
  methods: {
    handleAvatarChange(file) {
      this.form.photo = URL.createObjectURL(file.raw);
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
          formData.append("id", this.form.id);

          formData.append("photo", this.form.avatarFile);
          formData.append("username", this.form.username);
          formData.append("phone_number", this.form.phone_number);
          formData.append("address", this.form.address);
          formData.append("password", this.form.password);
          formData.append("user_type", this.form.user_type);
          formData.append("file", this.form.avatarFile);
          editinfo(formData).then(() => {
            this.$message({
              message: "Submit successful!",
              type: "success",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onReset() {
      this.$refs.form.resetFields();

      this.form = {
        id: "",
        photo: "",
        avatarFile: null,
        username: "",
        phone_number: "",
        address: "",
        password: "",
        user_type: "1",
      };
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
