import GlobalTop from "./global-top.vue";
import type { App } from "vue";

export default (app: App) => {
  app.component("GlobalTop", GlobalTop);
};
