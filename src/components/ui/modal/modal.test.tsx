import { render, screen } from "@testing-library/react";
import userEvent, { PointerEventsCheckLevel } from "@testing-library/user-event";
import { Modal } from "./modal";

describe("modal", () => {
  test("open at first", async () => {
    // arrange
    const onClose = () => [];
    const open = true;
    // act
    render(
      <Modal open={open} onClose={onClose}>
        <div>modal content</div>
      </Modal>
    );
    // assert
    expect(screen.getByText("modal content")).toBeInTheDocument();
  });

  test("close at first", async () => {
    // arrange
    const onClose = () => [];
    const open = false;
    // act
    render(
      <Modal open={open} onClose={onClose}>
        <div>modal content</div>
      </Modal>
    );
    // assert
    expect(screen.queryByText("modal content")).not.toBeInTheDocument();
  });

  test("onClose is fired by clicking button", async () => {
    // arrange
    const onClose = jest.fn();
    const open = true;
    render(
      <Modal open={open} onClose={onClose}>
        <div>modal content</div>
      </Modal>
    );
    // act
    await userEvent.click(screen.getByRole("button"), { pointerEventsCheck: PointerEventsCheckLevel.Never });
    // assert
    expect(onClose).toHaveBeenCalled();
  });

  test("onClose is fired by keydown escape key", async () => {
    // arrange
    const onClose = jest.fn();
    const open = true;
    render(
      <Modal open={open} onClose={onClose}>
        <div>modal content</div>
      </Modal>
    );
    // act
    await userEvent.keyboard("{escape}");
    // assert
    expect(onClose).toHaveBeenCalled();
  });

  test("onClose is fired by clicking backdrop", async () => {
    // arrange
    const onClose = jest.fn();
    const open = true;
    render(
      <Modal open={open} onClose={onClose}>
        <div>modal content</div>
      </Modal>
    );
    // act
    await userEvent.click(screen.getByTestId("backdrop"), { pointerEventsCheck: PointerEventsCheckLevel.Never });
    // assert
    expect(onClose).toHaveBeenCalled();
  });

  test("focus not go outside modal", async () => {
    // arrange
    const onClose = () => {};
    const open = true;
    render(
      <div>
        <input type="text" />
        <Modal open={open} onClose={onClose}>
          <div>modal content</div>
        </Modal>
      </div>
    );
    // act
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    // assert
    expect(screen.getByRole("button")).toHaveFocus();
  });
});
