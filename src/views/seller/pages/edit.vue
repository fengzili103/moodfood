<template>
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="100px"
      size="mini"
    >
      <el-form-item label="Image" prop="image">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleImageChange"
          :before-upload="beforeImageUpload"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input v-model="form.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <el-button @click="onReset">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      form: {
        id: null,
        image: null,
        imageUrl: "",
        name: "",
        price: "",
        description: "",
      },
      rules: {
        image: [
          {
            required: true,
            message: "Please upload an image",
            trigger: "change",
          },
        ],
        name: [
          { required: true, message: "Please input the name", trigger: "blur" },
        ],
        price: [
          {
            required: true,
            message: "Please input the price",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please input the description",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleImageChange(file) {
      this.form.image = file.raw;
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeImageUpload(file) {
      const isImage = file.type.startsWith("image/");
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error("The file must be an image!");
      }
      if (!isLt2M) {
        this.$message.error("The image size cannot exceed 2MB!");
      }
      return isImage && isLt2M;
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append("image", this.form.image);
          formData.append("name", this.form.name);
          formData.append("price", this.form.price);
          formData.append("description", this.form.description);

          let url = "https://your-api-endpoint.com/submit";
          let method = "POST";

          if (this.form.id) {
            url = `https://your-api-endpoint.com/submit/${this.form.id}`;
            method = "PUT";
          }

          fetch(url, {
            method: method,
            body: formData,
          })
            .then((response) => response.json())
            .then(() => {
              this.$message.success("Submit successful!");
              this.dialogVisible = false; // Close the dialog on success
            })
            .catch((error) => {
              console.error("Error:", error);
              this.$message.error("Submit failed!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onReset() {
      //this.$refs.form.resetFields();
      this.form = {
        id: null,
        image: null,
        imageUrl: "",
        name: "",
        price: "",
        description: "",
      };
    },
    edit(id) {
      this.dialogTitle = "Edit";
      // Fetch the data for the given id and populate the form
      fetch(`https://your-api-endpoint.com/item/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.form.id = data.id;
          this.form.name = data.name;
          this.form.price = data.price;
          this.form.description = data.description;
          this.form.imageUrl = data.imageUrl; // Assuming the API returns the image URL
          this.dialogVisible = true; // Open the dialog for editing
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$message.error("Failed to load item data!");
        });
    },
    add() {
      this.dialogTitle = "Create";
      this.onReset();
      this.dialogVisible = true; // Open the dialog for creating
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
  text-align: center;
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
