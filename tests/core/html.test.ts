import { screen } from "@testing-library/dom";
import { createApp } from "index";

describe("html directive", () => {
  it("injects html", () => {
    document.body.innerHTML = `
      <div id="app">
        <div c-html="content" data-testid="1" />
      </div>
    `;
    const app = createApp({ root: "#app", data: { content: "<p>foo</p>" } });
    const target = screen.getByTestId("1");

    expect(target.children.length).toEqual(1);
    expect(target.firstChild?.textContent).toEqual("foo");

    app.data.content = "<p>bar</p>";
    expect(target.children.length).toEqual(1);
    expect(target.firstChild?.textContent).toEqual("bar");
  });
});
