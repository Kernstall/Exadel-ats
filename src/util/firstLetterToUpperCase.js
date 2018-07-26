const firstLetterToUpperCase = (inputString) => {
  if (!inputString) {
    return inputString;
  }
  const wordsWithSpaces = inputString.split(/\s+/gmi);
  const words = wordsWithSpaces.filter(word => word !== '');
  const newWords = words.map(word => String(word[0]).toUpperCase() + word.slice(1).toLowerCase());
  return newWords.join(' ');
};

export default firstLetterToUpperCase;
