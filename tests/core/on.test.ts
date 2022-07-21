import { fireEvent, screen } from "@testing-library/dom";
import { createApp } from "index";

describe("on directive", () => {
  it("triggers methods", () => {
    document.body.innerHTML = `
      <div id="app">
        <button c-on:click="handler" data-testid="1">1</button>
        <button @click="handler" data-testid="2">2</button>
        <p data-testid="3">{{ status }}</p>
        <p data-testid="4">{{ message }}</p>
      </div>
    `;
    createApp({
      root: "#app",
      data: {
        status: "normal",
        message: "hello",
      },
      handler() {
        this.data.status = "danger";
        this.data.message = "caution";
      },
    });
    const button1 = screen.getByTestId("1");
    const button2 = screen.getByTestId("2");
    const text1 = screen.getByTestId("3");
    const text2 = screen.getByTestId("4");

    expect(text1.textContent).toEqual("normal");
    expect(text2.textContent).toEqual("hello");

    fireEvent.click(button1);
    fireEvent.click(button2);
    expect(text1.textContent).toEqual("danger");
    expect(text2.textContent).toEqual("caution");
  });
});
