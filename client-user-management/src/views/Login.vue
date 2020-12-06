<template>
  <div class="col-md-12">
    <div class="card card-container">
      <font-awesome-icon icon="user" class="profile-img-card" />
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form name="form" @submit.prevent="handleLogin" class="was-validated">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            class="form-control"
            name="username"
            required
            v-model="user.username"
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
            required
            v-model="user.password"
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
            <span
              class="spinner-border spinner-border-sm"
              v-show="loading"
            ></span>
            <span>Login</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import UserService from "../services/user.service";
import { useStore } from "vuex";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "login",
  setup() {
    const router = useRouter();
    const store = useStore();
    const { currentUser } = store.getters;

    //ref behaves like a data function on vue-2
    //With “reactive()” function you need to collect all properties in one object:
    const user = ref({ username: "", password: "" });
    let loading = ref(false);
    let errorMessage = ref("");

    const isFormValid = computed(() => {
      return Object.keys(user.value).every(k => user.value[k]);
    });

    function handleLogin() {
      loading = true;
      UserService.login(user.value).then(
        data => {
          console.log(data);
          //You can get warning (error: 'data' is defined but never used;), if you don't use parameters;
          router.push("/profile");
        },
        error => {
          console.log(error);
          errorMessage.value = "Username or password is not valid.";
          loading = false;
        }
      );
    }

    onMounted(() => {
      if (currentUser) {
        router.push("/profile");
      }
    });

    watch(user.value, (newValue, oldValue) => {
      console.log("user value is changed from: ", newValue, oldValue);
    });

    return {
      user,
      loading,
      errorMessage,
      currentUser,
      isFormValid,
      handleLogin
    };
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
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  border-radius: 50%;
}
</style>
