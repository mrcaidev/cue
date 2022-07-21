import { screen } from "@testing-library/dom";
import { createApp } from "index";

describe("mustache syntax", () => {
  it("gets parsed", () => {
    document.body.innerHTML = `
      <div id="app">
        <p data-testid="1">status: {{ status }}, message: {{ message }}</p>
      </div>
    `;
    createApp({ root: "#app", data: { status: "normal", message: "hello" } });
    const target = screen.getByTestId("1");

    expect(target.textContent).toEqual("status: normal, message: hello");
  });

  it("is reponsive", () => {
    document.body.innerHTML = `
      <div id="app">
        <p data-testid="1">{{ status }}</p>
      </div>
    `;
    const app = createApp({ root: "#app", data: { status: "normal" } });
    const target = screen.getByTestId("1");

    expect(target.textContent).toEqual("normal");

    app.data.status = "danger";
    expect(target.textContent).toEqual("danger");
  });
});
