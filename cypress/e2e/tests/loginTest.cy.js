/// <reference types="cypress" />
import { LoginPage } from "../pages/loginPage.cy.js";
import loginSelector from "../selectors/loginSelectors.cy.js"
require('cypress-xpath');

 
const loginPage = new LoginPage();
let usernameValid,passwordValid,usernameInvalid,passwordInvalid;
  
describe("Login Test Cases", () => {
 
beforeEach(()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
      cy.visit("/login")
      cy.fixture("adminLogin").then((adminData)=>{3
        usernameValid = adminData.usernameValid;
        passwordValid = adminData.passwordValid
        usernameInvalid = adminData.usernameInvalid;
        passwordInvalid = adminData.passwordInvalid

      })

})
  it("Login With Valid Data", () => {
  loginPage.loginUser(usernameValid,passwordValid)
  cy.xpath(loginSelector.alertSuccessLoginXpath).should("be.visible").should("contain.text",`You are logged in as user "admin".`)
       
 
}); 
 
it("Login With Invalid Data", () => {
    loginPage.loginUser(usernameInvalid,passwordInvalid)
    cy.get(loginSelector.alertErrorMessage).should("be.visible").should("contain.text",`Invalid login name or password!`)
         
   
  }); 
  it("Login With Empty Data", () => {
    loginPage.loginUser("{backspace}","{backspace}")
    cy.get(loginSelector.alertEmptyUsername).should("be.visible").should("contain.text","Username can't be empty")
    cy.get(loginSelector.alertEmptyPassword).should("be.visible").should("contain.text","Password can't be empty")
   
  }); 

  it.only("Verify the UI of Login Page", () => {
   cy.get(loginSelector.tamarhIcon).should("be.visible")
   cy.get(loginSelector.WelcomeTamrah).should("be.visible").should("contain.text","Welcome to Tamrah!")
   cy.get(loginSelector.usernameField).should("be.visible")
   cy.get(loginSelector.passwordField).should("be.visible")
   cy.get(loginSelector.loginButton).should("be.visible")


   
  }); 
   
});


