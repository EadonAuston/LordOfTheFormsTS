import { FormEvent, useState } from "react";
import { FunctionalInput } from "./FunctionalInput";
import { FunctionalFormType, PhoneInputState } from "../types";
import {
  isNameMoreThan2Characters,
  isEmailValid,
  isCityValid,
  isPhoneNumberValid,
} from "../utils/validations";
import { capitalize } from "../utils/transformations";
import { FunctionalPhone } from "./FunctionalPhone";

const errorMessages = {
  firstNameErrorMessage: "First name must be at least 2 characters long",
  lastNameErrorMessage: "Last name must be at least 2 characters long",
  emailErrorMessage: "Email is Invalid",
  cityErrorMessage: "State is Invalid",
};

export const FunctionalForm = ({ setUser }: FunctionalFormType) => {
  const [formWasSubmitted, setFormWasSubmitted] = useState<boolean>(false);
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);

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

      setFirstNameInput("");
      setLastNameInput("");
      setEmailInput("");
      setCityInput("");
      setPhoneInput(["", "", "", ""]);
      setFormWasSubmitted(false);
    } else {
      alert("bad data input");
      setFormWasSubmitted(true);
    }
  };
  const functionalInputObjects = [
    {
      inputChange: setFirstNameInput,
      value: firstNameInput,
      errorMessage: errorMessages.firstNameErrorMessage,
      labelText: "First Name",
      placeholder: "Bilbo",
      validation: isNameMoreThan2Characters,
    },
    {
      inputChange: setLastNameInput,
      value: lastNameInput,
      errorMessage: errorMessages.lastNameErrorMessage,
      labelText: "Last Name",
      placeholder: "Baggins",
      validation: isNameMoreThan2Characters,
    },
    {
      inputChange: setEmailInput,
      value: emailInput,
      errorMessage: errorMessages.emailErrorMessage,
      labelText: "Email",
      placeholder: "bilbo-baggins@adventurehobbits.net",
      validation: isEmailValid,
    },
    {
      inputChange: setCityInput,
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

      {functionalInputObjects.map((inputObject, index) => (
        <FunctionalInput
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
      <FunctionalPhone
        phoneInput={phoneInput}
        setPhoneInput={setPhoneInput}
        showError={formWasSubmitted}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
