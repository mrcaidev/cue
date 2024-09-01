import { createApp } from "src";
import { describe, expect, test } from "vitest";

describe("Directive c-bind", () => {
  test("Directive is parsed and removed", () => {
    document.body.innerHTML = `
      <div id="app">
        <div c-bind:class="a" id="test1"></p>
        <div :class="b.c" id="test2"></p>
      </div>
    `;
    createApp({ root: "#app", data: { a: 0, b: { c: 0 } } });
    const div1 = document.querySelector("#test1")!;
    const div2 = document.querySelector("#test2")!;

    expect(div1.className).toEqual("0");
    expect(div1.hasAttribute("c-bind:class")).toEqual(false);

    expect(div2.className).toEqual("0");
    expect(div2.hasAttribute(":class")).toEqual(false);
  });

  test("Bound attribute is reponsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <div :class="a" id="test"></p>
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: 0 } });
    const div = document.querySelector("#test")!;

    expect(div.className).toEqual("0");

    app.data["a"] = 1;
    expect(div.className).toEqual("1");
  });

  test("Boolean attribute is correctly handled", () => {
    document.body.innerHTML = `
      <div id="app">
        <input :disabled="a" id="test" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: false } });
    const input = document.querySelector<HTMLInputElement>("#test")!;

    expect(input.disabled).toEqual(false);

    app.data["a"] = true;
    expect(input.disabled).toEqual(true);
  });
});
