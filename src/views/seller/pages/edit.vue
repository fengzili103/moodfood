<template>
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="100px"
      size="mini"
    >
      <el-form-item label="Image">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleImageChange"
          :before-upload="beforeImageUpload"
          :auto-upload="false"
          action=""
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="Name" prop="food_name">
        <el-input v-model="form.food_name"></el-input>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input v-model="form.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Ingredients" prop="ingredients">
        <el-input type="textarea" v-model="form.ingredients"></el-input>
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
import { addOne, editOne } from "./service.js";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      form: {
        id: null,
        image: null,
        imageUrl: "",
        food_name: "",
        price: "",
        description: "",
        ingredients: "",
      },
      rules: {
        image: [
          {
            required: true,
            message: "Please upload an image",
            trigger: "change",
          },
        ],
        food_name: [
          { required: true, message: "Please input the name", trigger: "blur" },
        ],
        price: [
          {
            required: true,
            message: "Please input the price",
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
          formData.append("file", this.form.image);
          formData.append("food_name", this.form.food_name);
          formData.append("price", this.form.price);
          formData.append("description", this.form.description);
          formData.append("ingredients", this.form.ingredients);

          if (this.form.id) {
            formData.append("id", this.form.id);
            editOne(formData)
              .then(() => {
                this.$message.success("Submit successful!");
                this.dialogVisible = false;
                this.$parent.search();
              })
              .catch(() => {
                this.$message.error("Submit failed!");
              });
          } else {
            addOne(formData)
              .then(() => {
                this.$message.success("Submit successful!");
                this.dialogVisible = false;
                this.$parent.search();
              })
              .catch(() => {
                this.$message.error("Submit failed!");
              });
          }
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
        food_name: "",
        price: "",
        description: "",
        ingredients: "",
      };
    },
    edit(row) {
      this.dialogTitle = "Edit";
      this.onReset();
      this.dialogVisible = true; // Open the dialog for creating
      this.form = {
        id: row.id,
        imageUrl: row.photo,
        food_name: row.food_name,
        price: row.price,
        description: row.description,
        ingredients: row.ingredients,
      };
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
