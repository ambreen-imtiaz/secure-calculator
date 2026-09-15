const {
  add,
  subtract,
  multiply,
  divide
} = require('./src/calculator');

const { isValidNumber } = require('./src/validator');
const { saveHistory, loadHistory } = require('./src/storage');

function getOperation(operation) {
  const operations = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide'
  };

  return operations[operation];
}

function calculate(firstValue, operation, secondValue) {
  if (!isValidNumber(firstValue) || !isValidNumber(secondValue)) {
    throw new Error('Invalid number');
  }

  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);
  const operationName = getOperation(operation);

  if (!operationName) {
    throw new Error('Invalid operation');
  }

  return {
    add,
    subtract,
    multiply,
    divide
  }[operationName](firstNumber, secondNumber);
}

function renderHistory(history, historyElement) {
  historyElement.textContent = '';

  history.forEach((entry) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${entry.expression} = ${entry.result}`;
    historyElement.appendChild(listItem);
  });
}

function initializeCalculator() {
  const form = document.getElementById('calculator-form');
  const firstNumberInput = document.getElementById('first-number');
  const operationInput = document.getElementById('operation');
  const secondNumberInput = document.getElementById('second-number');
  const errorMessage = document.getElementById('error-message');
  const resultElement = document.getElementById('result');
  const historyElement = document.getElementById('history');
  const display = document.getElementById('display');
  const expression = document.getElementById('expression');
  const historyToggle = document.getElementById('history-toggle');
  const historyPanel = document.getElementById('history-panel');
  const clearHistoryButton = document.getElementById('clear-history');

  if (
    !form ||
    !firstNumberInput ||
    !operationInput ||
    !secondNumberInput ||
    !errorMessage ||
    !resultElement ||
    !historyElement ||
    !display ||
    !expression
  ) {
    return;
  }

  let currentValue = '0';
  let storedValue = null;
  let pendingOperation = null;
  let shouldResetDisplay = false;
  let history = loadHistory();

  function updateDisplay() {
    display.textContent = currentValue;
  }

  function clearCalculator() {
    currentValue = '0';
    storedValue = null;
    pendingOperation = null;
    shouldResetDisplay = false;
    expression.textContent = '';
    errorMessage.textContent = '';
    resultElement.textContent = '';
    updateDisplay();
  }

  function inputNumber(value) {
    errorMessage.textContent = '';

    if (shouldResetDisplay) {
      currentValue = '0';
      shouldResetDisplay = false;
    }

    if (value === '.' && currentValue.includes('.')) {
      return;
    }

    if (currentValue === '0' && value !== '.') {
      currentValue = value;
    } else {
      currentValue += value;
    }

    updateDisplay();
  }

  function toggleSign() {
    if (currentValue === '0') {
      return;
    }

    currentValue = currentValue.startsWith('-')
      ? currentValue.slice(1)
      : `-${currentValue}`;

    updateDisplay();
  }

  function backspace() {
    if (shouldResetDisplay) {
      return;
    }

    currentValue = currentValue.length > 1
      ? currentValue.slice(0, -1)
      : '0';

    if (currentValue === '-') {
      currentValue = '0';
    }

    updateDisplay();
  }

  function chooseOperation(operation) {
    errorMessage.textContent = '';

    if (pendingOperation && storedValue !== null && !shouldResetDisplay) {
      performCalculation();
    }

    storedValue = currentValue;
    pendingOperation = operation;
    shouldResetDisplay = true;

    const symbol = {
      '*': '×',
      '/': '÷'
    }[operation] || operation;

    expression.textContent = `${storedValue} ${symbol}`;
  }

  function performCalculation() {
    if (storedValue === null || !pendingOperation) {
      return;
    }

    try {
      const firstValue = storedValue;
      const secondValue = currentValue;
      const calculationResult = calculate(
        firstValue,
        pendingOperation,
        secondValue
      );

      const symbol = {
        '*': '×',
        '/': '÷'
      }[pendingOperation] || pendingOperation;

      const entry = {
        expression: `${firstValue} ${symbol} ${secondValue}`,
        result: calculationResult
      };

      const updatedHistory = [entry, ...history];

      currentValue = String(calculationResult);
      resultElement.textContent = '';
      expression.textContent = entry.expression;

      if (saveHistory(updatedHistory)) {
        history = updatedHistory;
        renderHistory(history, historyElement);
      } else {
        errorMessage.textContent =
          'Calculation completed, but history could not be saved.';
      }

      storedValue = null;
      pendingOperation = null;
      shouldResetDisplay = true;
      updateDisplay();
    } catch (error) {
      errorMessage.textContent = error.message;
      currentValue = '0';
      storedValue = null;
      pendingOperation = null;
      shouldResetDisplay = false;
      updateDisplay();
    }
  }

  document.querySelectorAll('[data-number]').forEach((button) => {
    button.addEventListener('click', () => {
      inputNumber(button.dataset.number);
    });
  });

  document.querySelectorAll('[data-operation]').forEach((button) => {
    button.addEventListener('click', () => {
      chooseOperation(button.dataset.operation);
    });
  });

  document.querySelector('[data-action="clear"]')
    .addEventListener('click', clearCalculator);

  document.querySelector('[data-action="clear-entry"]')
    .addEventListener('click', () => {
      currentValue = '0';
      shouldResetDisplay = false;
      updateDisplay();
    });

  document.querySelector('[data-action="backspace"]')
    .addEventListener('click', backspace);

  document.querySelector('[data-action="toggle-sign"]')
    .addEventListener('click', toggleSign);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    performCalculation();
  });

  if (historyToggle && historyPanel) {
    historyToggle.addEventListener('click', () => {
      historyPanel.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    });
  }

  if (clearHistoryButton) {
    clearHistoryButton.addEventListener('click', () => {
      history = [];
      saveHistory(history);
      renderHistory(history, historyElement);
    });
  }

  renderHistory(history, historyElement);
  updateDisplay();
}

if (typeof document !== 'undefined') {
  initializeCalculator();
}

module.exports = {
  getOperation,
  calculate,
  renderHistory,
  initializeCalculator
};
