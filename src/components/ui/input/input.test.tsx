import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("input", () => {
  test("onChange is fired by user's type", async () => {
    // arrange
    const onChange = jest.fn();
    // act
    render(<Input onChange={onChange} value={""} />);
    userEvent.type(screen.getByRole("textbox"), "test");
    // assert
    expect(onChange).toHaveBeenCalledTimes("test".length);
    expect(onChange).toHaveBeenCalledWith("t");
    expect(onChange).toHaveBeenCalledWith("e");
    expect(onChange).toHaveBeenCalledWith("s");
    expect(onChange).toHaveBeenCalledWith("t");
  });

  test("if disabled, onChange is NOT fired by user's type", async () => {
    // arrange
    const onChange = jest.fn();
    // act
    render(<Input onChange={onChange} value={""} disabled={true} />);
    userEvent.type(screen.getByRole("textbox"), "test");
    // assert
    expect(onChange).not.toHaveBeenCalled();
  });

  test("if autoFocus, input has focused", async () => {
    // arrange
    const onChange = jest.fn();
    // act
    render(<Input onChange={onChange} value={""} autoFocus={true} />);
    // assert
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
