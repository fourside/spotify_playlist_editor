import { FormEvent, useCallback, useEffect, useState, VFC } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { container, label, submitError, validationError } from "./playlist-form.css";

type Props = {
  submitting: boolean;
  onSubmit: (name: string) => void;
};

export const PlaylistForm: VFC<Props> = (props) => {
  const { onSubmit } = props;
  const [name, setName] = useState<string>();
  const [pristine, setPristine] = useState<boolean>(true);
  const [valid, setValid] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>();

  const handleNameChange = useCallback((newName: string) => {
    setSubmitErrorMessage(undefined);
    if (newName === "") {
      setName(undefined);
    } else {
      setName(newName);
    }
    setPristine(false);
  }, []);

  const submit = useCallback(() => {
    if (props.submitting || name === undefined || !valid) {
      return;
    }
    try {
      onSubmit(name);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setSubmitErrorMessage(error.message);
      }
    }
  }, [name, onSubmit, props.submitting, valid]);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      submit();
    },
    [submit]
  );

  const handleButtonClick = useCallback(() => {
    submit();
  }, [submit]);

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
        <Button buttonType="primary" onClick={handleButtonClick} disabled={!valid || props.submitting}>
          {props.submitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

const FIELD_ID__NAME = "playlist-name";
