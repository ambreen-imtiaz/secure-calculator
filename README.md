# Secure Calculator

A small secure calculator web application built with HTML, CSS, and JavaScript.

## Project Purpose

The purpose of this project is to demonstrate a small software application developed using secure coding practices, unit testing, version control, continuous integration, and GitHub Pages deployment.

The calculator supports:

- Addition
- Subtraction
- Multiplication
- Division
- Decimal and negative numbers
- Calculation history
- Safe division-by-zero handling
- Persistent history using browser localStorage

## Technologies and Tools

- HTML5
- CSS3
- JavaScript
- Node.js
- npm
- Jest — unit testing
- ESLint — code quality/linting
- esbuild — browser bundling
- Git and GitHub — version control
- GitHub Actions — continuous integration and deployment
- GitHub Pages — application hosting

## Project Structure

```text
secure-calculator/
├── src/
│   ├── calculator.js
│   ├── validator.js
│   └── storage.js
├── tests/
│   ├── calculator.test.js
│   ├── validator.test.js
│   └── storage.test.js
├── diagrams/
├── docs/
│   └── screenshots/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── pages.yml
├── app.js
├── index.html
├── style.css
├── package.json
└── README.md
