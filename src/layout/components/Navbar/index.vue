<template>
  <div class="navbar">
    <div class="left-container">
      <logo-title class="navBar-logo-title" />
    </div>

    <div class="right-container">
      <div class="mid-container">
        <el-link type="danger" @click="goto('home')">Home</el-link>
        <el-link type="danger" @click="goto('foodlist')">Food List</el-link>
        <el-link type="danger" @click="goto('cart')"
          >My Cart
          <div class="amount" id="amount">{{ amount }}</div></el-link
        >
        <el-link type="danger" @click="goto('current')"
          >Current Orders
        </el-link>
        <el-link type="danger" @click="goto('hub')">My Hub</el-link>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="imgsrc" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
          <span class="user-name">{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/consumer/home">
            <el-dropdown-item> Home </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Quit</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import logoTitle from "../LogoTitle/index.vue";

export default {
  name: "navBar",
  components: {
    logoTitle,
  },
  data() {
    return {
      imgsrc: "",
      name: "",
      amount: 0,
      currentItems: [],
    };
  },
  computed: {},
  mounted() {
    const user = JSON.parse(sessionStorage.getItem("userinfor"));
    this.imgsrc = user.photo;
    this.name = user.username;
    window.addCart = this.addCart;
    window.getCart = this.getCart;
    window.deleteCart = this.deleteCart;
    window.addCartReal = this.addCartReal;
    window.clearCart = this.clearCart;
  },
  methods: {
    goto(path) {
      const targetPath = `/consumer/${path}`;
      if (this.$route.path !== targetPath) {
        this.$router.push(targetPath);
      }
    },
    clearCart() {
      this.amount = 0;
      this.currentItems = [];
    },
    addCart() {
      this.amount++;
    },
    addCartReal(item) {
      (item.date =
        new Date().toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) +
        " " +
        new Date().toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        })),
        this.currentItems.push(item);
    },
    getCart() {
      return this.currentItems;
    },
    deleteCart(id) {
      this.amount--;
      for (let i = 0; i < this.currentItems.length; i++) {
        if (this.currentItems[i].id === id) {
          this.currentItems.splice(i, 1);
          break;
        }
      }
    },

    async logout() {
      // await this.$store.dispatch("user/logout");
      this.$router.push(`/loginConsumer`);
    },
  },
};
</script>

<style lang="scss" scoped>
.amount {
  position: absolute;
  right: -20px;
  top: 5px;
  font-size: 12px;
  width: 20px;
  height: 20px;
  color: white;
  background-color: #ca0000;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
}
.navbar {
  display: flex;
  justify-content: space-between;
  height: 123px;
  overflow: hidden;
  position: relative;
  background-color: #f8eee2;
  border-bottom: 3px solid #ca0000;
  color: #fff;
}
.navBar-logo-title {
  width: 210px;
}
.left-container {
  display: flex;
  align-items: center;
}

.right-container {
  display: flex;
  align-items: center;
  .mid-container {
    display: flex;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    margin-right: 30px;
    .el-link {
      margin-right: 40px;
    }
  }

  .avatar-container {
    margin-right: 30px;
    color: black;

    .avatar-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      .user-name {
        cursor: pointer;
        padding-left: 5px;
      }
      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
