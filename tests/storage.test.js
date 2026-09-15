const localStorageMock = {
  store: {},

  setItem(key, value) {
    this.store[key] = value;
  },

  getItem(key) {
    return this.store[key] || null;
  },

  clear() {
    this.store = {};
  }
};

global.localStorage = localStorageMock;

const { saveHistory, loadHistory } = require('../src/storage');

test('saves and loads calculation history', () => {
  const history = [
    {
      expression: '2 + 3',
      result: 5
    }
  ];

  saveHistory(history);

  expect(loadHistory()).toEqual(history);
});

test('returns an empty array when no history is stored', () => {
  localStorage.clear();

  expect(loadHistory()).toEqual([]);
});

test('returns an empty array when stored history is invalid JSON', () => {
  localStorage.setItem('secureCalculatorHistory', 'not valid json');

  expect(loadHistory()).toEqual([]);
});

test('returns an empty array when stored history is not an array', () => {
  localStorage.setItem(
    'secureCalculatorHistory',
    JSON.stringify({ expression: '2 + 3', result: 5 })
  );

  expect(loadHistory()).toEqual([]);
});

test('returns an empty array when localStorage fails', () => {
  const originalGetItem = localStorage.getItem;

  localStorage.getItem = () => {
    throw new Error('Storage unavailable');
  };

  expect(loadHistory()).toEqual([]);

  localStorage.getItem = originalGetItem;
});

test('returns false when saving history fails', () => {
  const originalSetItem = localStorage.setItem;

  localStorage.setItem = () => {
    throw new Error('Storage unavailable');
  };

  const history = [
    {
      expression: '2 + 3',
      result: 5
    }
  ];

  expect(saveHistory(history)).toBe(false);

  localStorage.setItem = originalSetItem;
});

test('rejects history entries with a non-finite result', () => {
  localStorage.setItem(
    'secureCalculatorHistory',
    JSON.stringify([
      {
        expression: '2 + 3',
        result: 'five'
      }
    ])
  );

  expect(loadHistory()).toEqual([]);
});
