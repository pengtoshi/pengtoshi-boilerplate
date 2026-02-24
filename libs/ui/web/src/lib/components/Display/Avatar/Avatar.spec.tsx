import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Avatar.stories";

describe("Avatar", () => {
  Object.entries(composeStories(stories)).forEach(([storyName, Story]) => {
    it(`should render ${storyName}`, () => {
      const { baseElement } = render(<Story />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
