import { createApp } from "@/app.ts";
import { describe, expect, test } from "bun:test";

describe("Mustache syntax", () => {
  test("Mustache syntax is parsed and removed", () => {
    document.body.innerHTML = `
      <div id="app">
        <p id="test">a: {{ a }}, b.c: {{ b.c }}</p>
      </div>
    `;
    createApp({ root: "#app", data: { a: 1, b: { c: 2 } } });
    const paragraph = document.querySelector("#test")!;

    expect(paragraph.textContent).toEqual("a: 1, b.c: 2");
  });

  test("Multiple identical paths are all parsed and removed", () => {
    document.body.innerHTML = `
      <div id="app">
        <p id="test">{{ a }} {{ a }} {{ a }}</p>
      </div>
    `;
    createApp({ root: "#app", data: { a: 0 } });
    const paragraph = document.querySelector("#test")!;

    expect(paragraph.textContent).toEqual("0 0 0");
  });

  test("Parsed text is reponsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <p id="test">{{ a }} {{ b.c }}</p>
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: 0, b: { c: 0 } } });
    const paragraph = document.querySelector("#test")!;

    expect(paragraph.textContent).toEqual("0 0");

    app.data.a = 1;
    expect(paragraph.textContent).toEqual("1 0");

    app.data.b.c = 2;
    expect(paragraph.textContent).toEqual("1 2");
  });
});
