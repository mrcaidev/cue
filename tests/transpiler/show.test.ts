import { createApp } from "@/app.ts";
import { describe, expect, test } from "bun:test";

describe("Directive c-show", () => {
  test("Directive is parsed and removed", () => {
    document.body.innerHTML = `
      <div id="app">
        <div c-show="a" id="test"></div>
      </div>
    `;
    createApp({ root: "#app", data: { a: false } });
    const toggle = document.querySelector<HTMLDivElement>("#test")!;

    expect(toggle.style.display).toEqual("none");
    expect(toggle.hasAttribute("c-show")).toEqual(false);
  });

  test("Style is responsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <div c-show="a" id="test"></div>
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: false } });
    const toggle = document.querySelector<HTMLDivElement>("#test")!;

    expect(toggle.style.display).toEqual("none");

    app.data.a = true;
    expect(toggle.style.display).toEqual("");
  });
});
