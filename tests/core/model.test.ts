import { fireEvent, screen } from "@testing-library/dom";
import { createApp } from "app";

describe("model directive", () => {
  it("works on input", () => {
    document.body.innerHTML = `
      <div id="app">
        <input type="text" c-model="message" data-testid="1" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { message: "" } });
    const target = screen.getByTestId("1") as HTMLInputElement;

    fireEvent.input(target, { target: { value: "hello" } });
    expect(app.data.message).toEqual("hello");

    app.data.message = "world";
    expect(target.value).toEqual("world");
  });

  it("works on textarea", () => {
    document.body.innerHTML = `
      <div id="app">
        <textarea c-model="message" data-testid="1" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { message: "" } });
    const target = screen.getByTestId("1") as HTMLInputElement;

    fireEvent.input(target, { target: { value: "hello" } });
    expect(app.data.message).toEqual("hello");

    app.data.message = "world";
    expect(target.value).toEqual("world");
  });

  it("works on checkbox", () => {
    document.body.innerHTML = `
      <div id="app">
        <input type="checkbox" c-model="confirm" data-testid="1" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { confirm: false } });
    const target = screen.getByTestId("1") as HTMLInputElement;

    fireEvent.change(target, { target: { checked: true } });
    expect(app.data.confirm).toEqual(true);

    app.data.confirm = false;
    expect(target.checked).toEqual(false);
  });

  it("works on multi-checkbox", () => {
    document.body.innerHTML = `
      <div id="app">
        <input type="checkbox" value="1" c-model="pool" data-testid="1" />
        <input type="checkbox" value="2" c-model="pool" data-testid="2" />
        <input type="checkbox" value="3" c-model="pool" data-testid="3" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { pool: [] } });
    const target1 = screen.getByTestId("1") as HTMLInputElement;
    const target2 = screen.getByTestId("2") as HTMLInputElement;
    const target3 = screen.getByTestId("3") as HTMLInputElement;

    fireEvent.change(target1, { target: { checked: true } });
    expect(app.data.pool).toEqual(["1"]);

    fireEvent.change(target2, { target: { checked: true } });
    expect(app.data.pool).toEqual(["1", "2"]);

    fireEvent.change(target3, { target: { checked: true } });
    expect(app.data.pool).toEqual(["1", "2", "3"]);

    app.data.pool = ["2", "3"];
    expect(target1.checked).toEqual(false);
    expect(target2.checked).toEqual(true);
    expect(target3.checked).toEqual(true);

    app.data.pool = ["3"];
    expect(target1.checked).toEqual(false);
    expect(target2.checked).toEqual(false);
    expect(target3.checked).toEqual(true);

    app.data.pool = [];
    expect(target1.checked).toEqual(false);
    expect(target2.checked).toEqual(false);
    expect(target3.checked).toEqual(false);
  });

  it("works on radio", () => {
    document.body.innerHTML = `
      <div id="app">
        <input type="radio" value="male" c-model="sex" data-testid="1" />
        <input type="radio" value="female" c-model="sex" data-testid="2" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { sex: "male" } });
    const target1 = screen.getByTestId("1") as HTMLInputElement;
    const target2 = screen.getByTestId("2") as HTMLInputElement;

    fireEvent.change(target2, { target: { checked: true } });
    expect(app.data.sex).toEqual("female");

    app.data.sex = "male";
    expect(target1.checked).toEqual(true);
  });

  it("works on select", () => {
    document.body.innerHTML = `
      <div id="app">
        <select c-model="pool">
          <option value="1" data-testid="1">1</option>
          <option value="2" data-testid="2">2</option>
        </select>
      </div>
    `;
    const app = createApp({ root: "#app", data: { pool: "" } });
    const target1 = screen.getByTestId("1") as HTMLOptionElement;
    const target2 = screen.getByTestId("2") as HTMLOptionElement;

    fireEvent.change(target1, { target: { checked: true } });
    expect(app.data.pool).toEqual("1");

    fireEvent.change(target2, { target: { checked: true } });
    expect(app.data.pool).toEqual("2");

    app.data.pool = "1";
    expect(target1.selected).toEqual(true);
    expect(target2.selected).toEqual(false);

    app.data.pool = "2";
    expect(target1.selected).toEqual(false);
    expect(target2.selected).toEqual(true);
  });
});
