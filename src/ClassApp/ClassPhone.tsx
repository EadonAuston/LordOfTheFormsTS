import React from "react";
import { ChangeEventHandler, Fragment, Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isPhoneNumberValid } from "../utils/validations";
import { PhoneInputState } from "../types";

type ClassPhoneProps = {
  phoneInput: PhoneInputState;
  setPhoneInput: (value: PhoneInputState) => void;
  showError: boolean;
};

export class ClassPhone extends Component<ClassPhoneProps> {
  render() {
    const { phoneInput, setPhoneInput, showError } = this.props;

    const refs: React.RefObject<HTMLInputElement>[] = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ];

    const createOnChangeHandler =
      (index: number): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        const lengths = [2, 2, 2, 1];
        const currentMaxLength = lengths[index];
        const nextRef = refs[index + 1];
        const prevRef = refs[index - 1];
        let newValue = "";
        if (!isNaN(Number(e.target.value))) {
          newValue = e.target.value;
        } else return;
        const newState = [...phoneInput];
        const shouldGoToNextRef = currentMaxLength === newValue.length;
        const shouldGoToPrevRef = newValue.length === 0;
        newState[index] = newValue;

        if (shouldGoToNextRef && nextRef) {
          nextRef.current?.focus();
        }
        if (shouldGoToPrevRef && prevRef) {
          prevRef.current?.focus();
        }
        if (shouldGoToPrevRef && !prevRef) {
          e.target.value = "";
        }

        // This makes it so that if this case: ["", "23", "23", ""] you can fill in the first pair and it will focus on whatever is ahead that is empty
        if (shouldGoToNextRef && nextRef === undefined) {
          e.target.maxLength = currentMaxLength;
        } else if (
          shouldGoToNextRef &&
          nextRef.current?.value.length === lengths[index + 1] &&
          refs[index + 2].current?.value.length !== lengths[index + 2]
        ) {
          refs[index + 2].current?.focus();
        } else if (
          shouldGoToNextRef &&
          nextRef.current?.value.length === lengths[index + 1] &&
          refs[index + 2].current?.value.length === lengths[index + 2] &&
          refs[index + 3].current?.value.length !== lengths[index + 3]
        ) {
          refs[index + 3].current?.focus();
        }

        setPhoneInput(newState as PhoneInputState);
      };
    const classInputObject = [
      { ref: refs, key: "phoneInput1" },
      { ref: refs, key: "phoneInput2" },
      { ref: refs, key: "phoneInput3" },
      { ref: refs, key: "phoneInput4" },
    ];

    return (
      <>
        <div className="input-wrap" key="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap" key="phone-input-">
            {classInputObject.map((input, index) => (
              <Fragment key={input.key}>
                <input
                  ref={input.ref[index]}
                  type="text"
                  id={`phone-input-${index + 1}`}
                  placeholder={
                    index === classInputObject.length - 1 ? "5" : "55"
                  }
                  value={phoneInput[index]}
                  onChange={createOnChangeHandler(index)}
                  maxLength={index === classInputObject.length - 1 ? 1 : 2}
                />
                <div key={`dashKey${input.key}`}>
                  {index !== classInputObject.length - 1 ? "-" : null}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <ErrorMessage
          message={"Invalid Phone Number"}
          show={showError && !isPhoneNumberValid(phoneInput)}
          key="phoneErrorMessage"
        />
      </>
    );
  }
}
