import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaylistForm } from "./playlist-form";

describe("PlaylistForm", () => {
  describe("初回renderのとき", () => {
    test("autoFocusされる", () => {
      // arrange
      const onSubmit = () => {};
      const submitting = false;
      // act
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // assert
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    test("未入力なのでbuttonが押せない", async () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      await userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });

    test("未入力なのでenterでsubmitできない", async () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      await userEvent.type(screen.getByRole("button"), "{enter}");
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });

    test("未入力だが、エラーメッセージが表示されていない", () => {
      // arrange
      const onSubmit = () => {};
      const submitting = false;
      // act
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // assert
      expect(screen.queryByText("Name is required")).toBeNull();
    });
  });

  test("ラベルをクリックするとinputにフォーカスが移る", async () => {
    // arrange
    const onSubmit = () => {};
    const submitting = false;
    render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
    // act
    await userEvent.click(screen.getByLabelText("playlist name"));
    // assert
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  describe("入力してから消したとき", () => {
    test("必須エラーメッセージが出る", async () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      await userEvent.type(screen.getByRole("textbox"), "t{backspace}");
      // assert
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    test("buttonが押せない", async () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t{backspace}");
      // act
      await userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });

    test("enterでsubmitできない", async () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t{backspace}");
      // act
      await userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("入力すると", () => {
    test("buttonが押せる", async () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t");
      // act
      await userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).toHaveBeenCalledWith("t");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    test("enterでsubmitできる", async () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t");
      // act
      await userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).toHaveBeenCalledWith("t");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("submittingがtrueのとき", () => {
    test("buttonが押せない", async () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = true;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      await userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });

    test("buttonのテキストが変わる", () => {
      // arrange & act
      const onSubmit = () => {};
      const submitting = true;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // assert
      expect(screen.getByRole("button").textContent).toBe("Submitting...");
    });

    test("inputに入力できない", async () => {
      // arrange
      const onSubmit = () => {};
      const submitting = true;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      await userEvent.type(screen.getByRole("textbox"), "test");
      // assert
      expect(screen.getByRole("textbox")).toHaveValue("");
    });

    test("enterでsubmitできない", async () => {
      // arrange
      const onSubmit = jest.fn();
      const initialSubmitting = false;
      const { rerender } = render(<PlaylistForm onSubmit={onSubmit} submitting={initialSubmitting} />);
      await userEvent.type(screen.getByRole("textbox"), "test");
      // rerender to switch submitting to true
      const secondSubmitting = true;
      rerender(<PlaylistForm onSubmit={onSubmit} submitting={secondSubmitting} />);
      // act
      await userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("submit時に例外が出たとき", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    test("エラーメッセージが出る", async () => {
      // arrange
      const onSubmit = () => {
        throw new Error("Submit error");
      };
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t");
      // act
      await userEvent.click(screen.getByRole("button"));
      // assert
      expect(screen.getByText("Submit error")).toBeInTheDocument();
    });

    test("buttonが押せなくなる", async () => {
      // arrange
      const onSubmit = jest.fn().mockImplementationOnce(() => {
        throw new Error("Submit error");
      });
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t");
      // act
      await userEvent.click(screen.getByRole("button"));
      await userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).toHaveBeenCalledTimes(1); // 2回クリックに対して1回だけ呼ばれる
    });

    test("enterでsubmitできなくなる", async () => {
      // arrange
      const onSubmit = jest.fn().mockImplementationOnce(() => {
        throw new Error("Submit error");
      });
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t");
      // act
      await userEvent.click(screen.getByRole("button"));
      await userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).toHaveBeenCalledTimes(1); // enter分がカウントされていない
    });

    test("再入力するとエラーメッセージは消える", async () => {
      // arrange
      const onSubmit = () => {
        throw new Error("Submit error");
      };
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t");
      await userEvent.click(screen.getByRole("button"));
      // act
      await userEvent.type(screen.getByRole("textbox"), "e");
      // assert
      expect(screen.queryByText("Submit error")).toBeNull();
    });

    test("再入力するとbuttonが押せるようになる", async () => {
      // arrange
      const onSubmit = jest.fn().mockImplementationOnce(() => {
        throw new Error("Submit error");
      });
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t");
      await userEvent.click(screen.getByRole("button"));
      // act
      await userEvent.type(screen.getByRole("textbox"), "e");
      await userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });

    test("再入力するとenterでsubmitできるようになる", async () => {
      // arrange
      const onSubmit = jest.fn().mockImplementationOnce(() => {
        throw new Error("Submit error");
      });
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      await userEvent.type(screen.getByRole("textbox"), "t");
      await userEvent.click(screen.getByRole("button"));
      // act
      await userEvent.type(screen.getByRole("textbox"), "e");
      await userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });
  });
});
