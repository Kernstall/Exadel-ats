const firstLetterToUpperCase = (inputString) => {
  const words = inputString.split(' ');
  const newWords = words.map(word => word[0].toUpperCase() + [...word].slice(1).toLowerCase());
  return newWords;
};

export default firstLetterToUpperCase;
