import { createApp } from "@/app.ts";
import { describe, expect, test } from "bun:test";

describe("Directive c-html", () => {
  test("Directive is parsed and removed", () => {
    document.body.innerHTML = `
      <div id="app">
        <div c-html="a" id="test" />
      </div>
    `;
    createApp({ root: "#app", data: { a: "<p>foo</p>" } });
    const parent = document.querySelector("#test")!;

    expect(parent.innerHTML).toEqual("<p>foo</p>");
    expect(parent.hasAttribute("c-html")).toEqual(false);
  });

  test("Injected HTML is responsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <div c-html="a" id="test" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: "<p>foo</p>" } });
    const parent = document.querySelector("#test")!;

    expect(parent.innerHTML).toEqual("<p>foo</p>");

    app.data.a = "<p>bar</p>";
    expect(parent.innerHTML).toEqual("<p>bar</p>");
  });
});
