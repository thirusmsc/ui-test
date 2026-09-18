
Feature: Host App basic checks
  As a developer
  I want to verify the Host App loads correctly
  So that I know the deployment is healthy

  Scenario: Host App shows its heading and login button
    Given I open "http://localhost:5173"
    Then I should see the heading "Host App"
    And I should see the button "Sign in with Azure AD"

  Scenario: Inspection micro-frontend loads via Module Federation
    Given I open "http://localhost:5173"
    Then I should see the text "This content is loaded live from the Inspection micro-frontend"

