import { createApp } from "@mrcaidev/cue";

createApp({
  root: "#app",
  data: {
    name: "William",
    sex: "male",
    tech: [],
    language: "english",
    shouldEmail: false,
  },
  reset() {
    this.data.name = "";
    this.data.sex = "male";
    this.data.tech = [];
    this.data.language = "english";
    this.shouldEmail = false;
  },
});
