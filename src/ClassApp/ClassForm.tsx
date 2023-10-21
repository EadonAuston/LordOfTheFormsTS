import { Component, FormEvent } from "react";
import { ClassInput } from "./ClassInput";
import { ClassPhone } from "./ClassPhone";
import { PhoneInputState, UserInformation } from "../types";
import {
  isNameMoreThan2Characters,
  isEmailValid,
  isCityValid,
  isPhoneNumberValid,
} from "../utils/validations";
import { capitalize } from "../utils/transformations";

type ClassFormProps = {
  setUser: (user: UserInformation) => void;
};

type ClassFormState = {
  formWasSubmitted: boolean;
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneInput: PhoneInputState;
};

const errorMessages = {
  firstNameErrorMessage:
    "First name must be at least 2 characters long with no numbers",
  lastNameErrorMessage:
    "Last name must be at least 2 characters long with no numbers",
  emailErrorMessage: "Email is Invalid",
  cityErrorMessage: "State is Invalid",
};

export class ClassForm extends Component<ClassFormProps, ClassFormState> {
  state: ClassFormState = {
    formWasSubmitted: false,
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""],
  };
  render() {
    const {
      formWasSubmitted,
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInput,
    } = this.state;

    const { setUser } = this.props;

    const conditionsToSubmit = {
      isFirstNameValid: isNameMoreThan2Characters(firstNameInput),
      isLastNameValid: isNameMoreThan2Characters(lastNameInput),
      isEmailValid: isEmailValid(emailInput),
      isCityValid: isCityValid(capitalize(cityInput)),
      isPhoneNumberValid: isPhoneNumberValid(phoneInput),
    };

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (Object.values(conditionsToSubmit).every((item) => !!item)) {
        setUser({
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput,
          city: cityInput,
          phone: phoneInput,
        });

        this.setState({
          firstNameInput: "",
          lastNameInput: "",
          emailInput: "",
          cityInput: "",
          phoneInput: ["", "", "", ""],
          formWasSubmitted: false,
        });
      } else {
        alert("bad data input");
        this.setState({ formWasSubmitted: true });
      }
    };
    const classInputObjects = [
      {
        inputChange: (value: string) =>
          this.setState({ firstNameInput: value }),
        value: firstNameInput,
        errorMessage: errorMessages.firstNameErrorMessage,
        labelText: "First Name",
        placeholder: "Bilbo",
        validation: isNameMoreThan2Characters,
      },
      {
        inputChange: (value: string) => this.setState({ lastNameInput: value }),
        value: lastNameInput,
        errorMessage: errorMessages.lastNameErrorMessage,
        labelText: "Last Name",
        placeholder: "Baggins",
        validation: isNameMoreThan2Characters,
      },
      {
        inputChange: (value: string) => this.setState({ emailInput: value }),
        value: emailInput,
        errorMessage: errorMessages.emailErrorMessage,
        labelText: "Email",
        placeholder: "bilbo-baggins@adventurehobbits.net",
        validation: isEmailValid,
      },
      {
        inputChange: (value: string) => this.setState({ cityInput: value }),
        value: cityInput,
        errorMessage: errorMessages.cityErrorMessage,
        labelText: "City",
        placeholder: "Hobbiton",
        validation: isCityValid,
      },
    ];
    return (
      <form onSubmit={(e) => submitForm(e)}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {classInputObjects.map((inputObject, index) => (
          <ClassInput
            key={index}
            inputProps={{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                inputObject.inputChange(e.target.value);
              },
              placeholder: inputObject.placeholder,
              type: "text",
              list: inputObject.labelText === "City" ? "cities" : undefined,
              value: inputObject.value,
            }}
            errorMessage={inputObject.errorMessage}
            labelText={inputObject.labelText}
            validation={inputObject.validation}
            showError={formWasSubmitted}
          />
        ))}
        <ClassPhone
          phoneInput={phoneInput}
          setPhoneInput={(value: PhoneInputState) => {
            this.setState({ phoneInput: value });
          }}
          showError={formWasSubmitted}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
