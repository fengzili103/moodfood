<template>
  <div class="container">
    <el-button
      type="danger"
      icon="el-icon-top-left"
      circle
      @click="visable = true"
      v-show="!visable"
    ></el-button>
    <div class="body" v-show="visable">
      <div class="header">
        Chef Simon
        <div class="control">
          <el-button
            type="danger"
            icon="el-icon-bottom-right"
            circle
            @click="visable = false"
          ></el-button>
        </div>
      </div>
      <div class="content">
        <div v-for="(item, index) in chats" :key="index">
          <div class="line" v-if="item.type === 'ai'">
            <div class="line-in">
              <div class="chatlogo ai">
                <i class="el-icon-knife-fork"></i>
              </div>
              <div class="output" v-html="item.content"></div>
            </div>
          </div>
          <div class="line human" v-else>
            <div class="line-in">
              <div class="output" v-html="item.content"></div>
              <div class="chatlogo ai">
                <i class="el-icon-user-solid"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input">
        <el-input
          size="mini"
          placeholder="Say something to Chef Simon for food suggestion"
          v-model="content"
        >
          <el-button
            slot="append"
            icon="el-icon-s-promotion"
            type="danger"
            @click="send"
          ></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
// import { Message } from "element-ui";
import { send } from "./service";
export default {
  components: {},
  data() {
    return {
      visable: true,

      loading: false,
      content: "",

      chats: [
        {
          type: "ai",
          content: "Hellow, what can I do for you",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    send() {
      const isWaiting = this.chats.some(
        (chat) => chat.content === `<i class="el-icon-loading"></i> Waiting...`
      );

      if (isWaiting) {
        this.$message({
          message: "Please wait for the response",
          type: "warning",
        });
        return;
      }

      this.chats.push({
        type: "human",
        content: this.content,
      });
      this.chats.push({
        type: "ai",
        content: `<i class="el-icon-loading"></i> Waiting...`,
      });

      let data = {
        model: "Nous Hermes 2 Mistral DPO",
        messages: [{ role: "user", content: this.content }],
        max_tokens: 500,
        temperature: 0.28,
      };
      send(data).then((res) => {
        let response = res.choices[0].message.content;
        this.chats[this.chats.length - 1].content = response;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  width: auto;
  height: auto;
  position: relative;
  .body {
    width: 500px;
    height: 480px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 3px black;
    border: 1px solid #ca0000;
    .header {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ca000094;
      display: flex;
      padding-left: 10px;
      font-size: 16px;
      color: #ca0000;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
    }
    .content {
      width: 100%;
      height: calc(100% - 110px - 1px);
      padding-top: 16px;
      padding-bottom: 16px;
      .line {
        width: calc(100%);
        height: auto;
        margin-bottom: 15px;
        padding: 16px;
        display: flex;
        justify-content: flex-start;
        padding-bottom: 0;
        padding-top: 0;
        &.human {
          justify-content: flex-end;
          .chatlogo {
            margin-right: 0;
            margin-left: 5px;
          }
        }
        .line-in {
          width: calc(100% - 50px);
          display: flex;
          height: auto;
        }
        .chatlogo {
          width: 30px;
          height: 30px;
          border-radius: 3px;
          font-size: 16px;
          color: white;
          background-image: linear-gradient(to bottom left, #262626, #ca0000);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 5px;
        }
        .output {
          width: calc(100% - 30px - 5px);
          height: auto;
          min-height: 30px;
          line-height: 30px;
          text-align: left;
          background-color: #ca000094;
          color: white;
          font-size: 14px;
          padding-left: 5px;
          padding-right: 5px;
          border-radius: 2px;
          white-space: break-spaces;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }
    .input {
      padding: 20px;
    }
  }
}
</style>
