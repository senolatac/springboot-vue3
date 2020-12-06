<template>
  <div class="col-md-12">
    <div class="card card-container">
      <font-awesome-icon icon="user" class="profile-img-card" />
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form name="form" @submit.prevent="handleRegister" class="was-validated">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            type="text"
            class="form-control"
            name="name"
            v-model="user.name"
            required
          />
          <div class="invalid-feedback">
            Full name is required.
          </div>
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            class="form-control"
            name="username"
            v-model="user.username"
            required
          />
          <div class="invalid-feedback">
            Username is required.
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            name="password"
            v-model="user.password"
            required
          />
          <div class="invalid-feedback">
            Password is required.
          </div>
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary btn-block"
            :disabled="loading || !isFormValid"
          >
            <span class="spinner-border spinner-border-sm" v-show="loading" />
            <span>Sign Up</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import UserService from "../services/user.service";
import vuex from "vuex";
export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        name: ""
      },
      loading: false,
      errorMessage: ""
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
    isFormValid() {
      return Object.keys(this.user).every(k => this.user[k]);
    }
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.loading = true;
      UserService.register(this.user)
        .then(
          data => {
            //You can get warning (error: 'data' is defined but never used;), if you don't use parameters;
            console.log(data);
            //this.$store.dispatch("success", "Mission is completed.");
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          },
          error => {
            if (!error.response) {
              this.errorMessage = error;
            } else if (error.response.status === 409) {
              this.errorMessage = "Username is not valid.";
            } else {
              this.errorMessage = "Unexpected error occurred.";
            }
          }
        )
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 50px auto 25px;
  border-radius: 2px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  font-size: 80px;
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  border-radius: 50%;
}
</style>
