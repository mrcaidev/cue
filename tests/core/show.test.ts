import { screen } from "@testing-library/dom";
import { createApp } from "index";

describe("show directive", () => {
  it("controls display style", () => {
    document.body.innerHTML = `
      <div id="app">
        <div c-show="shouldShow" data-testid="1"></div>
      </div>
    `;
    const app = createApp({ root: "#app", data: { shouldShow: true } });
    const target = screen.getByTestId("1");

    expect(target.style.display).toEqual("");

    app.data.shouldShow = false;
    expect(target.style.display).toEqual("none");
  });
});
