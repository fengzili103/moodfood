<template>
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date"> </el-table-column>
      <el-table-column prop="comment" label="Comment"> </el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="remove(scope.row)"
            >remove</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getComment, removemessage } from "./service";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "Comment List",
      form: {
        food_id: "",
        user_id: "",
      },
    };
  },
  methods: {
    show(row) {
      this.dialogVisible = true;
      this.form.food_id = row.food_id;
      this.form.user_id = row.user_id;
      this.search();
    },
    search() {
      getComment(this.form).then((res) => {
        this.tableData = res.data;
      });
    },
    remove(row) {
      this.$confirm("Are you sure to delete this comment?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          removemessage(row).then(() => {
            this.search();
            this.$message({
              type: "success",
              message: "Delete successfully!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
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
