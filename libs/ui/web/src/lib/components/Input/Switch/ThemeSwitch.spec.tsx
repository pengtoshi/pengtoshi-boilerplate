import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./ThemeSwitch.stories";

describe("ThemeSwitch", () => {
  Object.entries(composeStories(stories)).forEach(([, Story]) => {
    it("should render", async () => {
      const { baseElement } = render(<Story />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
