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
