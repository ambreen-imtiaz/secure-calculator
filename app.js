const {
  add,
  subtract,
  multiply,
  divide
} = require('./src/calculator');

const { isValidNumber } = require('./src/validator');

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

module.exports = {
  getOperation,
  calculate
};
