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
        const display = document.getElementById("display");
        const expression = document.getElementById("expression");
        const historyToggle = document.getElementById("history-toggle");
        const historyPanel = document.getElementById("history-panel");
        const clearHistoryButton = document.getElementById("clear-history");
        if (!form || !firstNumberInput || !operationInput || !secondNumberInput || !errorMessage || !resultElement || !historyElement || !display || !expression) {
          return;
        }
        let currentValue = "0";
        let storedValue = null;
        let pendingOperation = null;
        let shouldResetDisplay = false;
        let history = loadHistory();
        function updateDisplay() {
          display.textContent = currentValue;
        }
        function clearCalculator() {
          currentValue = "0";
          storedValue = null;
          pendingOperation = null;
          shouldResetDisplay = false;
          expression.textContent = "";
          errorMessage.textContent = "";
          resultElement.textContent = "";
          updateDisplay();
        }
        function inputNumber(value) {
          errorMessage.textContent = "";
          if (shouldResetDisplay) {
            currentValue = "0";
            shouldResetDisplay = false;
          }
          if (value === "." && currentValue.includes(".")) {
            return;
          }
          if (currentValue === "0" && value !== ".") {
            currentValue = value;
          } else {
            currentValue += value;
          }
          updateDisplay();
        }
        function toggleSign() {
          if (currentValue === "0") {
            return;
          }
          currentValue = currentValue.startsWith("-") ? currentValue.slice(1) : `-${currentValue}`;
          updateDisplay();
        }
        function backspace() {
          if (shouldResetDisplay) {
            return;
          }
          currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
          if (currentValue === "-") {
            currentValue = "0";
          }
          updateDisplay();
        }
        function chooseOperation(operation) {
          errorMessage.textContent = "";
          if (pendingOperation && storedValue !== null && !shouldResetDisplay) {
            performCalculation();
          }
          storedValue = currentValue;
          pendingOperation = operation;
          shouldResetDisplay = true;
          const symbol = {
            "*": "\xD7",
            "/": "\xF7"
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
              "*": "\xD7",
              "/": "\xF7"
            }[pendingOperation] || pendingOperation;
            const entry = {
              expression: `${firstValue} ${symbol} ${secondValue}`,
              result: calculationResult
            };
            const updatedHistory = [entry, ...history];
            currentValue = String(calculationResult);
            resultElement.textContent = "";
            expression.textContent = entry.expression;
            if (saveHistory(updatedHistory)) {
              history = updatedHistory;
              renderHistory(history, historyElement);
            } else {
              errorMessage.textContent = "Calculation completed, but history could not be saved.";
            }
            storedValue = null;
            pendingOperation = null;
            shouldResetDisplay = true;
            updateDisplay();
          } catch (error) {
            errorMessage.textContent = error.message;
            currentValue = "0";
            storedValue = null;
            pendingOperation = null;
            shouldResetDisplay = false;
            updateDisplay();
          }
        }
        document.querySelectorAll("[data-number]").forEach((button) => {
          button.addEventListener("click", () => {
            inputNumber(button.dataset.number);
          });
        });
        document.querySelectorAll("[data-operation]").forEach((button) => {
          button.addEventListener("click", () => {
            chooseOperation(button.dataset.operation);
          });
        });
        document.querySelector('[data-action="clear"]').addEventListener("click", clearCalculator);
        document.querySelector('[data-action="clear-entry"]').addEventListener("click", () => {
          currentValue = "0";
          shouldResetDisplay = false;
          updateDisplay();
        });
        document.querySelector('[data-action="backspace"]').addEventListener("click", backspace);
        document.querySelector('[data-action="toggle-sign"]').addEventListener("click", toggleSign);
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          performCalculation();
        });
        if (historyToggle && historyPanel) {
          historyToggle.addEventListener("click", () => {
            historyPanel.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
          });
        }
        if (clearHistoryButton) {
          clearHistoryButton.addEventListener("click", () => {
            history = [];
            saveHistory(history);
            renderHistory(history, historyElement);
          });
        }
        renderHistory(history, historyElement);
        updateDisplay();
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
