import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faTimes,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faUserShield
} from '@fortawesome/free-solid-svg-icons';

library.add(faTimes,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faUserShield);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
