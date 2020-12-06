<template>
  <div class="container">
    <header class="jumbotron">
      <h1 class="display-3">
        <strong>{{ currentUser && currentUser.name }}</strong
        >, Welcome to my app.
      </h1>
    </header>
    <a class="btn btn-link log-out" @click="logOut">LogOut</a>
  </div>
</template>
<script>
import UserService from "../services/user.service";
import vuex from "vuex";
export default {
  name: "profile",
  computed: {
    ...vuex.mapGetters(["currentUser"])
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    logOut() {
      UserService.logOut().then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
