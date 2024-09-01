import { createApp } from "src";
import { describe, expect, test } from "vitest";

describe("Directive c-model", () => {
  test("Text input is responsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <input type="text" c-model="a" id="test" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: "" } });
    const input = document.querySelector<HTMLInputElement>("#test")!;

    expect(input.value).toEqual("");
    expect(input.hasAttribute("c-model")).toEqual(false);

    input.value = "foo";
    input.dispatchEvent(new Event("change"));
    expect(app.data["a"]).toEqual("foo");

    app.data["a"] = "bar";
    expect(input.value).toEqual("bar");
  });

  test("Textarea is responsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <textarea c-model="a" id="test" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: "" } });
    const textarea = document.querySelector<HTMLTextAreaElement>("#test")!;

    expect(textarea.value).toEqual("");
    expect(textarea.hasAttribute("c-model")).toEqual(false);

    textarea.value = "foo";
    textarea.dispatchEvent(new Event("change"));
    expect(app.data["a"]).toEqual("foo");

    app.data["a"] = "bar";
    expect(textarea.value).toEqual("bar");
  });

  test("Checkbox is responsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <input type="checkbox" c-model="a" id="test" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: false } });
    const input = document.querySelector<HTMLInputElement>("#test")!;

    expect(input.checked).toEqual(false);
    expect(input.hasAttribute("c-model")).toEqual(false);

    input.checked = true;
    input.dispatchEvent(new Event("change"));
    expect(app.data["a"]).toEqual(true);

    app.data["a"] = false;
    expect(input.checked).toEqual(false);
  });

  test("Multi-checkbox is responsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <input type="checkbox" value="foo" c-model="a" id="test1" />
        <input type="checkbox" value="bar" c-model="a" id="test2" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: [] } });
    const input1 = document.querySelector<HTMLInputElement>("#test1")!;
    const input2 = document.querySelector<HTMLInputElement>("#test2")!;

    expect(input1.checked).toEqual(false);
    expect(input2.checked).toEqual(false);
    expect(input1.hasAttribute("c-model")).toEqual(false);
    expect(input2.hasAttribute("c-model")).toEqual(false);

    input1.checked = true;
    input1.dispatchEvent(new Event("change"));
    expect(app.data["a"]).toEqual(["foo"]);

    input2.checked = true;
    input2.dispatchEvent(new Event("change"));
    expect(app.data["a"]).toEqual(["foo", "bar"]);

    app.data["a"] = ["bar"];
    expect(input1.checked).toEqual(false);
    expect(input2.checked).toEqual(true);

    app.data["a"] = [];
    expect(input1.checked).toEqual(false);
    expect(input2.checked).toEqual(false);
  });

  test("Radio is responsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <input type="radio" value="foo" c-model="a" id="test1" />
        <input type="radio" value="bar" c-model="a" id="test2" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: "foo" } });
    const input1 = document.querySelector<HTMLInputElement>("#test1")!;
    const input2 = document.querySelector<HTMLInputElement>("#test2")!;

    expect(input1.checked).toEqual(true);
    expect(input2.checked).toEqual(false);
    expect(input1.hasAttribute("c-model")).toEqual(false);
    expect(input2.hasAttribute("c-model")).toEqual(false);

    input2.checked = true;
    input2.dispatchEvent(new Event("change"));
    expect(app.data["a"]).toEqual("bar");

    app.data["a"] = "foo";
    expect(input1.checked).toEqual(true);
    expect(input2.checked).toEqual(false);
  });

  test("Select is responsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <select c-model="a" id="test">
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
        </select>
      </div>
    `;
    const app = createApp({ root: "#app", data: { a: "foo" } });
    const select = document.querySelector<HTMLSelectElement>("#test")!;

    expect(select.value).toEqual("foo");
    expect(select.hasAttribute("c-model")).toEqual(false);

    select.value = "bar";
    select.dispatchEvent(new Event("change"));
    expect(app.data["a"]).toEqual("bar");

    app.data["a"] = "foo";
    expect(select.value).toEqual("foo");
  });
});
