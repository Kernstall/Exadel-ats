import { isNullOrUndefined } from 'util';

const cutAfterNSymbols = (inputString, maxLength, replacingString) => {
  if (isNullOrUndefined(inputString)) {
    return inputString;
  }
  const words = inputString.split(' ');
  let result = '';
  for (let counter = 0, symbolsAmount = 0; symbolsAmount + words[counter].length + replacingString.length < maxLength; symbolsAmount += words[counter].length, counter++) {
    result += `${words[counter]} `;
  }
  return `${result}${replacingString}`;
};

export default cutAfterNSymbols;
