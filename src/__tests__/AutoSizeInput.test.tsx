import React from "react";
import { render, screen } from "@testing-library/react";
import AutosizeInput from "../AutoSizeInput";

describe("AutosizeInput", () => {
  it("should assign the given inputClassName", () => {
    const handleChange = jest.fn();

    render(
      <AutosizeInput
        onChange={handleChange}
        value="test"
        inputClassName="testClass"
      />,
    );

    const input = screen.getByDisplayValue("test") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.className).toContain("testClass");
  });
});
