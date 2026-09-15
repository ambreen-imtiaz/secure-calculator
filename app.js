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

  if (
    !form ||
    !firstNumberInput ||
    !operationInput ||
    !secondNumberInput ||
    !errorMessage ||
    !resultElement ||
    !historyElement
  ) {
    return;
  }

  let history = loadHistory();
  renderHistory(history, historyElement);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    errorMessage.textContent = '';
    resultElement.textContent = '';

    try {
      const firstValue = firstNumberInput.value;
      const operation = operationInput.value;
      const secondValue = secondNumberInput.value;

      const calculationResult = calculate(
        firstValue,
        operation,
        secondValue
      );

      const displayOperation = {
        '*': '×',
        '/': '÷'
      }[operation] || operation;

      const entry = {
        expression: `${firstValue} ${displayOperation} ${secondValue}`,
        result: calculationResult
      };

      const updatedHistory = [entry, ...history];

      resultElement.textContent = `Result: ${calculationResult}`;

      if (saveHistory(updatedHistory)) {
        history = updatedHistory;
        renderHistory(history, historyElement);
      } else {
        errorMessage.textContent =
          'Calculation completed, but history could not be saved.';
      }
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
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
