<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="https://vuejs.org/" class="navbar-brand">
        <img
          src="./assets/logo.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
        />
        Vue.js
      </a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item" v-if="isAdmin">
          <a href="/admin" class="nav-link">
            <font-awesome-icon icon="user-shield" /> Admin Panel
          </a>
        </li>
      </div>
      <div class="navbar-nav ml-auto" v-if="!currentUser">
        <li class="nav-item">
          <a href="/register" class="nav-link">
            <font-awesome-icon icon="user" /> Sign Up
          </a>
        </li>
        <li class="nav-item">
          <a href="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </a>
        </li>
      </div>
      <div class="navbar-nav ml-auto" v-if="currentUser">
        <li class="nav-item">
          <a href="/profile" class="nav-link">
            <font-awesome-icon icon="user" /> {{ currentUser.name }}
          </a>
        </li>
        <li class="nav-item">
          <a v-on:click="logOut" class="nav-link" style="cursor: pointer;">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "./services/user.service";
import Role from "./models/role";
import vuex from "vuex";

export default {
  computed: {
    ...vuex.mapGetters(["currentUser"]),
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.ADMIN;
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
