const trim = (x) => {
  const value = String(x);
  return value.replace(/^\s+|\s+$/gm, '');
};

const isEmpty = (value) => {
  if (value === null || value === undefined || trim(value) === '' || value.length === 0) {
    return true;
  }
  return false;
};

module.exports = { isEmpty };
