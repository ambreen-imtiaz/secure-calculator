function isValidNumber(value) {
  if (typeof value !== 'string') {
    return false;
  }

  if (value.trim() === '') {
    return false;
  }

  if (value !== value.trim()) {
    return false;
  }

  return Number.isFinite(Number(value));
}

module.exports = {
  isValidNumber
};
