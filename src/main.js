import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import UploadImages from "vue-upload-drop-images";

createApp(App)
  .use(router)
  .component("UploadImages", UploadImages)
  .mount("#app");
