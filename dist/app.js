(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // src/calculator.js
  var require_calculator = __commonJS({
    "src/calculator.js"(exports, module) {
      function add(a, b) {
        return a + b;
      }
      function subtract(a, b) {
        return a - b;
      }
      function multiply(a, b) {
        return a * b;
      }
      function divide(a, b) {
        if (b === 0) {
          throw new Error("Cannot divide by zero");
        }
        return a / b;
      }
      module.exports = {
        add,
        subtract,
        multiply,
        divide
      };
    }
  });

  // src/validator.js
  var require_validator = __commonJS({
    "src/validator.js"(exports, module) {
      function isValidNumber(value) {
        if (typeof value !== "string") {
          return false;
        }
        if (value.trim() === "") {
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
    }
  });

  // src/storage.js
  var require_storage = __commonJS({
    "src/storage.js"(exports, module) {
      var STORAGE_KEY = "secureCalculatorHistory";
      function isValidHistory(history) {
        return Array.isArray(history) && history.every(
          (entry) => entry && typeof entry.expression === "string" && Number.isFinite(entry.result)
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
    }
  });

  // app.js
  var require_app = __commonJS({
    "app.js"(exports, module) {
      var {
        add,
        subtract,
        multiply,
        divide
      } = require_calculator();
      var { isValidNumber } = require_validator();
      var { saveHistory, loadHistory } = require_storage();
      function getOperation(operation) {
        const operations = {
          "+": "add",
          "-": "subtract",
          "*": "multiply",
          "/": "divide"
        };
        return operations[operation];
      }
      function calculate(firstValue, operation, secondValue) {
        if (!isValidNumber(firstValue) || !isValidNumber(secondValue)) {
          throw new Error("Invalid number");
        }
        const firstNumber = Number(firstValue);
        const secondNumber = Number(secondValue);
        const operationName = getOperation(operation);
        if (!operationName) {
          throw new Error("Invalid operation");
        }
        return {
          add,
          subtract,
          multiply,
          divide
        }[operationName](firstNumber, secondNumber);
      }
      function renderHistory(history, historyElement) {
        historyElement.textContent = "";
        history.forEach((entry) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${entry.expression} = ${entry.result}`;
          historyElement.appendChild(listItem);
        });
      }
      function initializeCalculator() {
        const form = document.getElementById("calculator-form");
        const firstNumberInput = document.getElementById("first-number");
        const operationInput = document.getElementById("operation");
        const secondNumberInput = document.getElementById("second-number");
        const errorMessage = document.getElementById("error-message");
        const resultElement = document.getElementById("result");
        const historyElement = document.getElementById("history");
        if (!form || !firstNumberInput || !operationInput || !secondNumberInput || !errorMessage || !resultElement || !historyElement) {
          return;
        }
        let history = loadHistory();
        renderHistory(history, historyElement);
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          errorMessage.textContent = "";
          resultElement.textContent = "";
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
              "*": "\xD7",
              "/": "\xF7"
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
              errorMessage.textContent = "Calculation completed, but history could not be saved.";
            }
          } catch (error) {
            errorMessage.textContent = error.message;
          }
        });
      }
      if (typeof document !== "undefined") {
        initializeCalculator();
      }
      module.exports = {
        getOperation,
        calculate,
        renderHistory,
        initializeCalculator
      };
    }
  });
  require_app();
})();
