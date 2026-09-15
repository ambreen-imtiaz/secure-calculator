const STORAGE_KEY = 'secureCalculatorHistory';

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function loadHistory() {
  const storedHistory = localStorage.getItem(STORAGE_KEY);

  if (!storedHistory) {
    return [];
  }

  try {
    return JSON.parse(storedHistory);
  } catch {
    return [];
  }
}

module.exports = {
  saveHistory,
  loadHistory
};
