import { ErrorMessage } from "../ErrorMessage";
import { Component, ComponentProps } from "react";

type valueObject = {
  value: string;
};

type ClassInputProps = {
  errorMessage: string;
  labelText: string;
  inputProps: ComponentProps<"input"> | valueObject;
  validation: (e: string) => boolean;
  showError: boolean;
};

export class ClassInput extends Component<ClassInputProps> {
  render() {
    const { errorMessage, labelText, inputProps, validation, showError } =
      this.props;

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
}
