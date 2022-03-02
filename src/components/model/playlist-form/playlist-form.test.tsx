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

    test("未入力なのでbuttonが押せない", () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });

    test("未入力なのでenterでsubmitできない", () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      userEvent.type(screen.getByRole("button"), "{enter}");
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

  test("ラベルをクリックするとinputにフォーカスが移る", () => {
    // arrange
    const onSubmit = () => {};
    const submitting = false;
    render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
    // act
    userEvent.click(screen.getByLabelText("playlist name"));
    // assert
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  describe("入力してから消したとき", () => {
    test("必須エラーメッセージが出る", () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      userEvent.type(screen.getByRole("textbox"), "t{backspace}");
      // assert
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    test("buttonが押せない", () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t{backspace}");
      // act
      userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });

    test("enterでsubmitできない", () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t{backspace}");
      // act
      userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("入力すると", () => {
    test("buttonが押せる", () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t");
      // act
      userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).toHaveBeenCalledWith("t");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    test("enterでsubmitできる", () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t");
      // act
      userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).toHaveBeenCalledWith("t");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("submittingがtrueのとき", () => {
    test("buttonが押せない", () => {
      // arrange
      const onSubmit = jest.fn();
      const submitting = true;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      userEvent.click(screen.getByRole("button"));
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

    test("inputに入力できない", () => {
      // arrange
      const onSubmit = () => {};
      const submitting = true;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      // act
      userEvent.type(screen.getByRole("textbox"), "test");
      // assert
      expect(screen.getByRole("textbox")).toHaveValue("");
    });

    test("enterでsubmitできない", () => {
      // arrange
      const onSubmit = jest.fn();
      const initialSubmitting = false;
      const { rerender } = render(<PlaylistForm onSubmit={onSubmit} submitting={initialSubmitting} />);
      userEvent.type(screen.getByRole("textbox"), "test");
      // rerender to switch submitting to true
      const secondSubmitting = true;
      rerender(<PlaylistForm onSubmit={onSubmit} submitting={secondSubmitting} />);
      // act
      userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("submit時に例外が出たとき", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    test("エラーメッセージが出る", () => {
      // arrange
      const onSubmit = () => {
        throw new Error("Submit error");
      };
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t");
      // act
      userEvent.click(screen.getByRole("button"));
      // assert
      expect(screen.getByText("Submit error")).toBeInTheDocument();
    });

    test("buttonが押せなくなる", () => {
      // arrange
      const onSubmit = jest.fn().mockImplementationOnce(() => {
        throw new Error("Submit error");
      });
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t");
      // act
      userEvent.click(screen.getByRole("button"));
      userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).toHaveBeenCalledTimes(1); // 2回クリックに対して1回だけ呼ばれる
    });

    test("enterでsubmitできなくなる", () => {
      // arrange
      const onSubmit = jest.fn().mockImplementationOnce(() => {
        throw new Error("Submit error");
      });
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t");
      // act
      userEvent.click(screen.getByRole("button"));
      userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).toHaveBeenCalledTimes(1); // enter分がカウントされていない
    });

    test("再入力するとエラーメッセージは消える", () => {
      // arrange
      const onSubmit = () => {
        throw new Error("Submit error");
      };
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t");
      userEvent.click(screen.getByRole("button"));
      // act
      userEvent.type(screen.getByRole("textbox"), "e");
      // assert
      expect(screen.queryByText("Submit error")).toBeNull();
    });

    test("再入力するとbuttonが押せるようになる", () => {
      // arrange
      const onSubmit = jest.fn().mockImplementationOnce(() => {
        throw new Error("Submit error");
      });
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t");
      userEvent.click(screen.getByRole("button"));
      // act
      userEvent.type(screen.getByRole("textbox"), "e");
      userEvent.click(screen.getByRole("button"));
      // assert
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });

    test("再入力するとenterでsubmitできるようになる", () => {
      // arrange
      const onSubmit = jest.fn().mockImplementationOnce(() => {
        throw new Error("Submit error");
      });
      const submitting = false;
      render(<PlaylistForm onSubmit={onSubmit} submitting={submitting} />);
      userEvent.type(screen.getByRole("textbox"), "t");
      userEvent.click(screen.getByRole("button"));
      // act
      userEvent.type(screen.getByRole("textbox"), "e");
      userEvent.type(screen.getByRole("textbox"), "{enter}");
      // assert
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });
  });
});
