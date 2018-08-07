const generateRandomId = function () {
  return 'xxxxxxxxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16).slice(0, 24);
  });
};

export default generateRandomId;
