const isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

const hasUpperCase = (str) => {
  return str.toLowerCase() != str;
};

module.exports = { isRealString, hasUpperCase };
