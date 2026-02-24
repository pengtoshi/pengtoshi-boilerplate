import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./DropdownMenu.stories";

describe("DropdownMenu", () => {
  Object.entries(composeStories(stories)).forEach(([storyName, Story]) => {
    it(`should render ${storyName}`, () => {
      const { baseElement } = render(<Story />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
