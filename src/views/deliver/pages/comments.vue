<template>
  <el-dialog :visible.sync="dialogVisible" title="Comments">
    <el-table :data="comments" style="width: 100%">
      <el-table-column prop="user" label="User"> </el-table-column>
      <el-table-column prop="comment" label="Comment"> </el-table-column>
      <el-table-column prop="date" label="Date"> </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      comments: [
        {
          user: "User1",
          comment: "This is a great product!",
          date: "2023-10-01",
        },
        { user: "User2", comment: "I love it!", date: "2023-10-02" },
        { user: "User3", comment: "Highly recommended.", date: "2023-10-03" },
        // 更多评论...
      ],
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
