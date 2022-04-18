import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./accordion";

describe("accordion", () => {
  test("at first, not show content", async () => {
    // arrange & act
    render(
      <Accordion title="accordion title" header={<div>accordion header</div>}>
        <div>accordion content</div>
      </Accordion>
    );
    // assert
    expect(screen.queryByText("accordion content")).not.toBeInTheDocument();
  });

  test("show content by clicking", async () => {
    // arrange
    render(
      <Accordion title="accordion title" header={<div>accordion header</div>}>
        <div>accordion content</div>
      </Accordion>
    );
    // act
    await userEvent.click(screen.getByRole("button"));
    // assert
    expect(screen.getByText("accordion content")).toBeInTheDocument();
  });

  test("close content by clicking", async () => {
    // arrange
    render(
      <Accordion title="accordion title" header={<div>accordion header</div>}>
        <div>accordion content</div>
      </Accordion>
    );
    await userEvent.click(screen.getByRole("button"));
    // act
    await userEvent.click(screen.getByRole("button"));
    // assert
    expect(screen.queryByTestId("accordion content")).not.toBeInTheDocument();
  });

  test("always show header", async () => {
    // arrange & act
    render(
      <Accordion title="accordion title" header={<div>accordion header</div>}>
        <div>accordion content</div>
      </Accordion>
    );
    // assert
    expect(screen.getByText("accordion header")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("accordion header")).toBeInTheDocument();
  });
});
