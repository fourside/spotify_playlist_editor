import { render, screen } from "@testing-library/react";
import * as nextAuthReact from "next-auth/react";
import userEvent from "@testing-library/user-event";
import { HeaderComponent } from "./header";

describe("header", () => {
  test("show user name", async () => {
    // arrange & act
    render(<HeaderComponent userName="test user" />);
    // assert
    expect(screen.getByText("test user")).toBeInTheDocument();
  });

  test("click sign out fire next-auth sign out and redirect to /", async () => {
    // arrange
    const replaceMock = jest.fn();
    // Define the window to use the mocked function above
    Object.defineProperty(window, "location", {
      value: {
        replace: replaceMock,
      },
      writable: true,
    });

    const signOut = jest.fn();
    jest.spyOn(nextAuthReact, "signOut").mockImplementation(signOut);
    render(<HeaderComponent userName="test user" />);
    // act
    userEvent.click(screen.getByText("sign out"));
    // assert
    // await Promise.resolve();
    await flashPromise();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledTimes(1);
  });
});

function flashPromise(): Promise<void> {
  return Promise.resolve();
}
