Feature: Boilerplate proof - this framework can test any UI, not just ours
  As a QA engineer reusing this framework across different projects
  I want to prove it can log into and check a totally different application
  So that any team in the enterprise can adopt this same boilerplate

  Scenario: Log into a completely unrelated demo application and confirm it works
    Given I open "https://www.saucedemo.com"
    When I fill in "Username" with "standard_user"
    And I fill in "Password" with "secret_sauce"
    And I click the button "Login"
    Then I should see the text "Products"
    

