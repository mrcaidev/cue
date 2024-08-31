import {
  findElement,
  isElementNode,
  isTextNode,
  prepareFragment,
} from "src/utils/dom";
import { describe, expect, test } from "vitest";

describe("isElementNode", () => {
  test("It returns true if the argument is an element node", () => {
    const element = document.createElement("div");
    const result = isElementNode(element);
    expect(result).toEqual(true);
  });

  test("It returns false if the argument is not an element node", () => {
    const text = document.createTextNode("hello world");
    const result = isElementNode(text);
    expect(result).toEqual(false);
  });
});

describe("isTextNode", () => {
  test("It returns true if the argument is a text node", () => {
    const text = document.createTextNode("hello world");
    const result = isTextNode(text);
    expect(result).toEqual(true);
  });

  test("It returns false if the argument is not a text node", () => {
    const element = document.createElement("div");
    const result = isTextNode(element);
    expect(result).toEqual(false);
  });
});

describe("findElement", () => {
  test("It returns the element if the identifier exists", () => {
    const element = document.createElement("div");
    element.id = "foo";
    document.body.appendChild(element);

    const result = findElement("#foo");
    expect(result).toEqual(element);
  });

  test("It throws an error if the identifier does not exist", () => {
    expect(() => findElement("#bar")).toThrowError(
      "identifier not found: #bar",
    );
  });
});

describe("prepareFragment", () => {
  test("It returns a fragment with the same structure as the root", () => {
    const root = document.createElement("div");
    const child1 = document.createElement("p");
    const child2 = document.createElement("p");
    root.appendChild(child1);
    root.appendChild(child2);

    const fragment = prepareFragment(root);
    expect(fragment.children[0]).toEqual(child1);
    expect(fragment.children[1]).toEqual(child2);
  });
});
