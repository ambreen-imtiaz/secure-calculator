const STORAGE_KEY = 'secureCalculatorHistory';

function isValidHistory(history) {
  return Array.isArray(history) &&
    history.every((entry) =>
      entry &&
      typeof entry.expression === 'string' &&
      Number.isFinite(entry.result)
    );
}

function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch {
    return false;
  }
}

function loadHistory() {
  try {
    const storedHistory = localStorage.getItem(STORAGE_KEY);

    if (!storedHistory) {
      return [];
    }

    const parsedHistory = JSON.parse(storedHistory);

    if (!isValidHistory(parsedHistory)) {
      return [];
    }

    return parsedHistory;
  } catch {
    return [];
  }
}

module.exports = {
  saveHistory,
  loadHistory
};
