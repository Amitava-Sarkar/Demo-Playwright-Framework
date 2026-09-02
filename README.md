# Fuse Automation Scripts
This repository contains Playwright automation scripts for testing the Fuse application, covering critical user flows such as Login, Signup, Forgot Password, and other functional scenarios to ensure application functionality, stability, and reliability.
**:pushpin: Prerequisites **
Before setting up the project, ensure you have the following installed:
• Node.js (v16 or later)
• npm (comes with Node.js)
• Git
• Playwright (installed via npm)
 **:rocket: Installation & Setup**
:one: Clone the Repository
```git clone ```
:two: Install Dependencies
```npm install```
:three: Install Playwright Browsers
```npx playwright install```
-> Run All Tests
```npx playwright test```
-> Run Tests in Headed Mode (UI Visible)
```npx playwright test --headed```
-> Run specific test file
```npx playwright test tests/example.spec.ts```
-> View test report
```npx playwright show-report```

