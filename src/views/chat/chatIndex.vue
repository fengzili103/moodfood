<template>
  <div class="container">
    <div class="loading" v-if="loading">
      <i class="el-icon-loading"></i>
    </div>
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
      <div class="content" ref="chatContainer">
        <div v-for="(item, index) in chats" :key="index">
          <div class="line" v-if="item.role === 'assistant'">
            <div class="line-in">
              <div class="chatlogo assistant">
                <i class="el-icon-knife-fork"></i>
              </div>
              <div class="output" v-html="item.content"></div>
            </div>
          </div>
          <div class="line user" v-else>
            <div class="line-in">
              <div class="output" v-html="item.content"></div>
              <div class="chatlogo assistant">
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
          ref="inputField"
        >
          <div slot="append">
            <el-tooltip
              class="item"
              effect="dark"
              content="Send"
              placement="top"
            >
              <el-button
                icon="el-icon-s-promotion"
                type="danger"
                @click="send"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="Suggest food based on above content"
              placement="top"
            >
              <el-button
                icon="el-icon-tableware"
                type="danger"
                @click="suggestfood"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="New Chat"
              placement="top"
            >
              <el-button
                icon="el-icon-chat-dot-square"
                type="danger"
                @click="recall"
              ></el-button>
            </el-tooltip>
          </div>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// import { Message } from "element-ui";
import { send, foodsuggest, end } from "./service";
import { generateRandomString } from "@/utils/tool";
import nlp from "compromise";
export default {
  components: {},
  data() {
    return {
      visable: true,

      loading: false,
      content: "",
      generalinfo: {
        customer_id: "",
        sessionid: "",
      },

      chats: [
        {
          role: "assistant",
          content: "Hellow, what can I do for you",
        },
      ],
    };
  },
  watch: {
    $route(to) {
      if (to.path === "/consumer/home") {
        this.generalinfo.sessionid = generateRandomString(32);
        this.generalinfo.customer_id = JSON.parse(
          sessionStorage.getItem("userinfor")
        ).id;
      }
    },
  },
  created() {},
  mounted() {
    window.getContent = this.getContent;
    window.getGeneralInfo = this.getGeneralInfo;
    window.recallOnece = this.recallOnece;
    this.$refs.inputField.$el
      .querySelector("input")
      .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.send();
        }
      });
  },
  methods: {
    getGeneralInfo() {
      return this.generalinfo;
    },
    getSimpleWord(text) {
      const doc = nlp(text);
      const keywords = doc
        .nouns()
        .out("array")
        .filter((word) => !nlp(word).has("#Pronoun"));

      return keywords.toString();
    },
    getLastUserContent() {
      const lastUserChat = [...this.chats]
        .reverse()
        .find((chat) => chat.role === "user");
      return lastUserChat
        ? lastUserChat.content + ",make the short and quick response"
        : "";
    },
    handleEnterKey() {
      this.send();
    },
    recallOnece() {
      end({ sessionid: this.generalinfo.sessionid }).then(() => {
        this.chats = [
          {
            role: "assistant",
            content: "Hellow, what can I do for you",
          },
        ];
      });
    },
    recall() {
      // if ($(".el-icon-loading").length > 0) {
      //   this.$message({
      //     message: "Please wait for the response",
      //     type: "warning",
      //   });
      //   return;
      // }
      end({ sessionid: this.generalinfo.sessionid }).then(() => {
        this.$message({
          message: "The chat has been restarted",
          type: "success",
        });
        this.chats = [
          {
            role: "assistant",
            content: "Hellow, what can I do for you",
          },
        ];
      });
    },
    getContent() {
      return this.chats.slice(1, -2);
    },
    suggestfood() {
      if ($(".foodlist").length > 0) {
        this.$message({
          message: "Please restart chat",
          type: "warning",
        });
        return;
      }
      if ($(".el-icon-loading").length > 0) {
        this.$message({
          message: "Please wait for the response",
          type: "warning",
        });
        return;
      }
      if (this.chats.length <= 1) {
        this.$message({
          message: "Please input some keyword",
          type: "warning",
        });
        //this.chats.pop();
        return;
      }
      this.loading = true;
      let keyword = "";
      let keywordall = "";
      for (let i = 1; i < this.chats.length; i++) {
        if (this.chats[i].role === "user") {
          keyword += this.chats[i].content + ";";
        }
        keywordall += this.chats[i].content + ";";
      }
      keyword = keyword.replace(/\n/g, "");
      keyword = keyword.replace(/<br>/g, "");
      keyword = keyword.replace(/<\/br>/g, "");

      keywordall = this.getSimpleWord(keywordall);
      foodsuggest({ keywordall: keywordall, keyword: keyword }).then((res) => {
        let response = res.beans;
        let list = [];
        for (let i = 0; i < response.length; i++) {
          let $object = `<li class="clickable foodchoose" food-id="${
            response[i].id
          }" food-name="${response[i].food_name}"> (${i + 1}).${
            response[i].food_name
          }</li>`;
          list.push($object);
        }
        list.unshift(`<ul class="foodlist">`);
        list.push(`</ul>`);
        this.chats.push({
          role: "assistant",
          content: list.toString().replace(/,/g, ""),
        });
        this.chats.push({
          role: "assistant",
          content: `Choose the above food or <span class="clickable restart">Start new chat</span>`,
        });
        setTimeout(() => {
          $(".foodchoose").click((e) => {
            let foodid = $(e.target).attr("food-id");
            this.$router.push({
              path: "/consumer/foodlist",
              query: {
                foodid: foodid,
              },
            });
            setTimeout(() => {
              if (window.reloadfoodlist) {
                window.reloadfoodlist();
              }
            }, 200);
          });
          $(".restart").click(() => {
            this.recall();
          });
        }, 300);
        this.scrollToBottom();
        this.loading = false;
      });
      this.content = "";
    },
    send() {
      if (!this.content) {
        this.$message({
          message: "Please input some content",
          type: "warning",
        });
        return;
      }
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
        role: "user",
        content: this.content,
      });

      let data = {
        ...this.generalinfo,
        content: this.getLastUserContent(),
      };

      send(data).then((res) => {
        let response = res.result;
        response = response.replace(/<\|assistant\|>/g, "");

        this.chats[this.chats.length - 1].content = response;
      });
      this.content = "";

      this.chats.push({
        role: "assistant",
        content: `<i class="el-icon-loading"></i> Waiting...`,
      });
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
  },
};
</script>
<style lang="scss">
.foodchoose {
  &.clickable {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.clickable {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
<style scoped lang="scss">
.container {
  width: auto;
  height: auto;
  position: relative;
  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgba(202, 0, 0, 0.2);
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
      overflow-y: auto;
      .line {
        width: calc(100%);
        height: auto;
        margin-bottom: 15px;
        padding: 16px;
        display: flex;
        justify-content: flex-start;
        padding-bottom: 0;
        padding-top: 0;
        &.user {
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
