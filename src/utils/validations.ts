import { allCities } from "./all-cities";
import { PhoneInputState } from "../types";
export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isPhoneNumberValid(phoneNumber: PhoneInputState) {
  return phoneNumber.join("").length === 7 ? true : false;
}

export function isNameMoreThan2Characters(name: string) {
  const nameContainsNumbers = /^[a-zA-Z\s]{2,}$/.test(name);
  const nameLengthGreaterThanTwo = name.length >= 2 ? true : false;
  return !nameContainsNumbers && nameLengthGreaterThanTwo;
}

export function isCityValid(city: string) {
  const cityCopy = city.toLowerCase();
  let copyOfCities = [...allCities];
  copyOfCities = copyOfCities.map((city) => city.toLowerCase());
  return copyOfCities.includes(cityCopy) ? true : false;
}
