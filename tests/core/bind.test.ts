import { screen } from "@testing-library/dom";
import { createApp } from "index";

describe("bind directive", () => {
  it("gets parsed", () => {
    document.body.innerHTML = `
      <div id="app">
        <p c-bind:class="status" data-testid="1">Line 1</p>
        <p :class="status" data-testid="2">Line 2</p>
      </div>
    `;
    createApp({ root: "#app", data: { status: "normal" } });
    const target1 = screen.getByTestId("1");
    const target2 = screen.getByTestId("2");

    // c-bind:xxx
    expect(target1.className).toEqual("normal");

    // :xxx
    expect(target2.className).toEqual("normal");
  });

  it("is reponsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <p :class="status" data-testid="1">1</p>
      </div>
    `;
    const app = createApp({ root: "#app", data: { status: "normal" } });
    const target = screen.getByTestId("1");

    expect(target.className).toEqual("normal");

    app.data.status = "danger";
    expect(target.className).toEqual("danger");
  });
});
