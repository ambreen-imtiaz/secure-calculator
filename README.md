# Secure Calculator

## Purpose

Secure Calculator is a small browser-based calculator supporting addition, subtraction, multiplication, and division. The project demonstrates secure input validation, safe calculation logic, persistent calculation history, automated testing, linting, CI, and GitHub Pages deployment.

## Technologies and Tools

- HTML5
- CSS3
- JavaScript
- Node.js
- Jest — unit testing
- ESLint — code quality and linting
- esbuild — browser build/bundling
- Git and GitHub — version control and collaboration
- GitHub Actions — continuous integration and deployment
- GitHub Pages — hosting

## Setup

Clone the repository and enter the project directory:

    git clone https://github.com/ambreen-imtiaz/secure-calculator.git
    cd secure-calculator

Install dependencies:

    npm install

## Running the Test Suite Locally

Run all Jest tests with:

    npm test

The test suite covers calculator operations, input validation, persistent storage, error handling, and application behaviour.

## Linting

Run ESLint with:

    npm run lint

## Building the Application

Create the browser bundle with:

    npm run build

The bundled application is generated in the `dist/` directory.

## Running Locally

After installing dependencies, the project can be served locally with:

    npx serve .

Then open the local address provided by the server.

## CI Pipeline

The project uses GitHub Actions for continuous integration.

The CI workflow is configured in:

    .github/workflows/ci.yml

The workflow runs automatically when code is pushed to `main` or when a pull request targets `main`.

The pipeline:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies using `npm ci`.
4. Runs ESLint with `npm run lint`.
5. Runs the Jest test suite with `npm test`.

This ensures that code is checked automatically before changes are accepted into the main branch.

## GitHub Pages Deployment

The deployment workflow is configured in:

    .github/workflows/pages.yml

Changes pushed to `main` trigger the GitHub Pages deployment workflow. The workflow installs dependencies, builds the application, prepares the Pages artifact, and deploys it.

Live demo:

https://ambreen-imtiaz.github.io/secure-calculator/

## Security Considerations

The calculator is designed with security and defensive programming in mind.

- `eval()` is not used.
- The `Function()` constructor is not used.
- Calculator inputs are strictly validated before calculation.
- Only supported numeric formats are accepted.
- Division by zero is handled safely.
- User-visible content is written using `textContent` rather than unsafe HTML insertion.
- A Content Security Policy is included in `index.html`.
- `localStorage` failures are handled gracefully.
- Stored history is parsed and validated before use.
- Calculation logic is separated from DOM and storage code.

## Testing

The project uses Jest for automated unit testing.

The test suite verifies:

- Addition
- Subtraction
- Multiplication
- Division
- Division by zero
- Negative and decimal numbers
- Input validation
- Invalid number formats
- Persistent history storage
- Invalid/corrupted stored data
- Storage failures
- Application behaviour

## Branching and Pull Request Strategy

Development work is organised using feature branches rather than making all changes directly on `main`.

Typical workflow:

1. Create a feature branch from `main`.
2. Implement and test the feature.
3. Commit the changes with a meaningful commit message.
4. Push the branch to GitHub.
5. Open a pull request targeting `main`.
6. Review the changes.
7. Merge the pull request into `main`.

This keeps `main` stable and provides a clear development history.

## Project Structure

    secure-calculator/
    ├── src/
    ├── tests/
    ├── diagrams/
    ├── docs/
    │   └── screenshots/
    ├── .github/
    │   └── workflows/
    ├── app.js
    ├── index.html
    ├── style.css
    ├── package.json
    └── README.md

## AI Use Declaration

AI tools were used as development support for brainstorming, reviewing, explaining, and identifying possible improvements.

The developer reviewed, tested, and integrated the resulting work and remains responsible for understanding and explaining the implementation, architecture, security decisions, testing, and deployment.

AI was used to support development and did not replace developer judgment.

## Final Submission

The final submission is identified by the GitHub release/tag:

`Final Submission`

Repository:

https://github.com/ambreen-imtiaz/secure-calculator/
