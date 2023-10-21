import { Dispatch, SetStateAction, ComponentState } from "react";

export type PhoneInputState = [string, string, string, string];

export type UserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: PhoneInputState;
};

export type FunctionalFormType = {
  setUser: Dispatch<SetStateAction<ComponentState>>;
};
