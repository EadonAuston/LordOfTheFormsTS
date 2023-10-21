import { PhoneInputState } from "../FunctionalApp/FunctionalPhone";

export const capitalize = (capitalizeInput: string) => {
  let newWord = capitalizeInput.toLowerCase();
  newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
  return newWord;
};

export function formatPhoneNumber(phoneNumber: PhoneInputState) {
  const cleanedPhoneNumber = phoneNumber.toString().replace(/\D/g, "");
  let formattedPhoneNumber = "";

  for (let i = 0; i < cleanedPhoneNumber.length; i += 2) {
    const segment = cleanedPhoneNumber.slice(i, i + 2);
    formattedPhoneNumber += segment;
    if (i + 2 < cleanedPhoneNumber.length) {
      formattedPhoneNumber += "-";
    }
  }

  return formattedPhoneNumber;
}

export const allCaps = (makeAllCaps: string) => {
  return makeAllCaps.toUpperCase();
};
