import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("button", () => {
  test("click event fires onClick", async () => {
    // arrange
    const onClick = jest.fn();
    // act
    render(
      <Button buttonType="primary" onClick={onClick}>
        button
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    // assert
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("if disabled, click event NOT fires onClick", async () => {
    // arrange
    const onClick = jest.fn();
    // act
    render(
      <Button buttonType="primary" onClick={onClick} disabled={true}>
        button
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    // assert
    expect(onClick).not.toHaveBeenCalled();
  });
});
