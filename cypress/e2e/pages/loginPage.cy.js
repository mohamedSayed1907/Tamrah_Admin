/// <reference types="cypress" />
require('cypress-xpath');


 import loginSelector from "../selectors/loginSelectors.cy.js"

export class LoginPage {
    navigateToLogin()
    {
        cy.visit("http://tamrah-testing.us-east-2.elasticbeanstalk.com/login")
    }

    setUsername(username) {
        cy.get(loginSelector.usernameField).type(username);
    }
    setPassword(password) {
        cy.get(loginSelector.passwordField).type(password);
    }
    clickLogin() {
        cy.get(loginSelector.loginButton).click({timeout:50000});
    }
  
    loginUser(username, password) {
      this.setUsername(username);
      this.setPassword(password);
      
      this.clickLogin();
    }
 
 
   


  
  }
  