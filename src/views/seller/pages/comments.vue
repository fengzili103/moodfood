<template>
  <el-dialog :visible.sync="dialogVisible" title="Comments">
    <el-table :data="comments" style="width: 100%">
      <el-table-column prop="user_id" label="User"> </el-table-column>
      <el-table-column prop="review" label="Comment"> </el-table-column>
      <el-table-column prop="create_time" label="Date"> </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getComment } from "./service.js";
export default {
  data() {
    return {
      dialogVisible: false,
      comments: [],
    };
  },
  methods: {
    show(row) {
      this.dialogVisible = true;
      let param = {
        food_id: row.id,
        user_id: "",
      };
      getComment(param).then((res) => {
        this.comments = res.beans;
      });
    },
  },
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
