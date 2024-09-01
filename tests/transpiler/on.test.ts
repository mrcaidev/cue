import { createApp } from "src";
import { describe, expect, test, vi } from "vitest";

describe("Directive c-on", () => {
  test("Directive is parsed and removed", () => {
    document.body.innerHTML = `
      <div id="app">
        <button c-on:click="handler" id="test1"></button>
        <button @click="handler" id="test2"></button>
      </div>
    `;
    createApp({ root: "#app", methods: { handler: () => {} } });
    const button1 = document.querySelector("#test1")!;
    const button2 = document.querySelector("#test2")!;

    expect(button1.hasAttribute("c-on:click")).toEqual(false);
    expect(button2.hasAttribute("@click")).toEqual(false);
  });

  test("Registered methods are listening", () => {
    document.body.innerHTML = `
      <div id="app">
        <button @click="handler" id="test"></button>
      </div>
    `;
    const handler = vi.fn();
    createApp({ root: "#app", methods: { handler } });
    const button = document.querySelector<HTMLButtonElement>("#test")!;

    expect(handler).toHaveBeenCalledTimes(0);

    button.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
