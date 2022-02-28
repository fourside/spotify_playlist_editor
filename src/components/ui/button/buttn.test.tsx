import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("button", () => {
  test("click event fires onClick", async () => {
    // arrange
    const onClick = jest.fn();
    // act
    render(
      <Button type="primary" onClick={onClick}>
        button
      </Button>
    );
    userEvent.click(screen.getByRole("button"));
    // assert
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("if disabled, click event NOT fires onClick", async () => {
    // arrange
    const onClick = jest.fn();
    // act
    render(
      <Button type="primary" onClick={onClick} disabled={true}>
        button
      </Button>
    );
    userEvent.click(screen.getByRole("button"));
    // assert
    expect(onClick).not.toHaveBeenCalled();
  });
});
