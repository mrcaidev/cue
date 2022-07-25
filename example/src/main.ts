import { createApp } from "@mrcaidev/cue";
import "./styles/globals.css";
import "./styles/utils.css";

createApp({
  root: "#app",
  data: {
    status: "normal",
    user: {
      name: "",
      sex: "male",
      tech: [],
      lang: "english",
      isAdult: false,
    },
    shouldShow: false,
    rawHtml: "<p>I'm raw HTML</p>",
  },
  toggleStatus() {
    this.data.status = this.data.status === "normal" ? "danger" : "normal";
  },
  toggleShouldShow() {
    this.data.shouldShow = !this.data.shouldShow;
  },
});
