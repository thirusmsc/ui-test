Feature: Boilerplate proof #2 - a different website entirely

  Scenario: Google's homepage loads and shows its search button
    Given I open "https://www.google.com"
    Then I should see the button "Google Search"