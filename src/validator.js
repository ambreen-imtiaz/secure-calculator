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

  if (!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(value)) {
    return false;
  }

  return Number.isFinite(Number(value));
}

module.exports = {
  isValidNumber
};
