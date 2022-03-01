import { useCallback, useEffect, useState, VFC } from "react";
import { Button } from "../../ui/button/button";
import { Input } from "../../ui/input/input";
import { container, label, submitError, validationError } from "./playlist-form.css";

type Props = {
  submitting: boolean;
  onSubmit: (name: string) => void;
};

export const PlaylistForm: VFC<Props> = (props) => {
  const { onSubmit: onAsyncSubmit } = props;
  const [name, setName] = useState<string>();
  const [pristine, setPristine] = useState<boolean>(true);
  const [valid, setValid] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>();

  const handleNameChange = useCallback((newName) => {
    setSubmitErrorMessage(undefined);
    if (newName === "") {
      setName(undefined);
    } else {
      setName(newName);
    }
    setPristine(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (name === undefined) {
      return;
    }
    try {
      onAsyncSubmit(name);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setSubmitErrorMessage(error.message);
      }
    }
  }, [name, onAsyncSubmit]);

  useEffect(() => {
    if (name === undefined) {
      setValid(false);
    } else if (submitErrorMessage !== undefined) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [name, pristine, submitErrorMessage]);

  return (
    <form onSubmit={handleSubmit} className={container}>
      <label htmlFor={FIELD_ID__NAME} className={label}>
        playlist name
      </label>
      <Input
        onChange={handleNameChange}
        value={name ?? ""}
        autoFocus={true}
        id={FIELD_ID__NAME}
        disabled={props.submitting}
      />
      {!pristine && name === undefined && <div className={validationError}>Name is required</div>}
      {submitErrorMessage !== undefined && <div className={submitError}>{submitErrorMessage}</div>}
      <div>
        <Button buttonType="primary" onClick={handleSubmit} disabled={!valid || props.submitting}>
          {props.submitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

const FIELD_ID__NAME = "playlist-name";
