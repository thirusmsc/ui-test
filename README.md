## BDD UI Test Automation Framework

A reusable **Cucumber + Playwright** boilerplate for testing any web UI.
Write test scenarios in plain English, run them against Chromium, Firefox,
or Webkit, and get a full HTML report — with nothing hardcoded, so the
same framework can be used as a boiler plate into any project.

---

## What this is

- **Cucumber** reads test scenarios written in plain English (Gherkin) and
  matches each sentence to real browser actions.
- **Playwright** drives the actual browser.
- **A generic Page Object** (`pages/GenericPage.js`) and a small set of
  reusable step definitions mean you can test a brand-new website by
  writing a new `.feature` file only — no new code required.
- **Jenkins** automates running this on every push, with the browser,
  headless mode, and parallel execution count all pickable at build time.


---

## Getting started

```
npm install
npx playwright install          
```

## Running the tests

```
npm test                        # all feature files, Chromium, headless, 2 in parallel (defaults)
```

No values are hardcoded — every setting can be overridden with an environment variable:



Convenience shortcuts for each browser:
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
`BROWSER=firefox npm test` 
`HEADLESS=false npm test`
BROWSER=webkit HEADLESS=false PARALLEL=4 npm test
```

Run a single feature file only:
```bash
npx cucumber-js features/example-any-website.feature --require step-definitions --require features/support
```

---

## Writing a new test (no new code needed, for common actions)

Create a new `.feature` file under `features/`, and use these existing sentence patterns:

| Sentence | Does |
|---|---|
| `Given I open "<url>"` | Navigates to that URL |
| `When I fill in "<placeholder>" with "<value>"` | Types into a field |
| `When I click the button "<label>"` | Clicks a button |
| `Then I should see the heading "<text>"` | Checks a heading is visible |
| `Then I should see the text "<text>"` | Checks some text is visible |
| `Then I should see the button "<label>"` | Checks a button is visible |

Example:
```gherkin
Feature: My new page loads correctly

  Scenario: Heading is visible
    Given I open "http://localhost:5173"
    Then I should see the heading "Host App"
```

If you need an action that doesn't exist yet, add **one** new function to
`step-definitions/common-steps.js` (using `pages/GenericPage.js`) — after
that, every future feature file can reuse it too.

---

## Reports

```bash
npm run report
open reports/index.html
```

Every run generates a new, timestamped report under `reports/history/`
— nothing is overwritten. `reports/index.html` lists every run, with the
most recent marked latest. Failed steps automatically get a screenshot
attached.

---

## CI/CD — Jenkins

The `Jenkinsfile` runs the full pipeline (install → test → report →
publish) on every push. When triggering a build, you can pick:
- **BROWSER** — chromium / firefox / webkit
- **HEADLESS** — checkbox
- **PARALLEL** — how many scenarios run at once

The report is published directly inside the Jenkins build page, and also
archived as a downloadable artifact.

---

## Why this is a "boilerplate," not an app-specific test suite

`features/example-any-website.feature` and `features/example-google-search.feature`
intentionally test two public websites that have nothing to do with our
own app — using the exact same step definitions listed above, with zero
new code. That's the proof this framework can be copied into any other
project and pointed at a different URL, and it'll work the same way.