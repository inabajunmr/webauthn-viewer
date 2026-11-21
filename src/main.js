import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Field, Switch, Tabs, Toast } from "buefy";
import "buefy/dist/css/buefy.css";

createApp(App)
  .use(router)
  .use(Field)
  .use(Switch)
  .use(Tabs)
  .use(Toast)
  .mount("#app");
