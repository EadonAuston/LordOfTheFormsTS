import { ErrorMessage } from "../ErrorMessage";
import { ComponentProps } from "react";

type valueObject = {
  value: string;
};

export function FunctionalInput({
  errorMessage,
  labelText,
  inputProps,
  validation,
  showError,
}: {
  errorMessage: string;
  labelText: string;
  inputProps: ComponentProps<"input"> | valueObject;
  validation: (e: string) => boolean;
  showError: boolean;
}) {
  return (
    <>
      <div className="input-wrap">
        <label>{labelText}:</label>
        <input {...inputProps} />
      </div>
      <ErrorMessage
        message={errorMessage}
        show={
          showError &&
          !validation(
            inputProps.value === undefined ? "" : inputProps.value.toString()
          )
        }
      />
    </>
  );
}
