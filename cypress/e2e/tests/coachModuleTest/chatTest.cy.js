/// <reference types="cypress" />
import { LoginPage } from "../../pages/loginPage.cy.js";
import loginSelector from "../../selectors/loginSelectors.cy.js";
import coachData from "../../../fixtures/mainData.json";
require("cypress-xpath");

const loginPage = new LoginPage();
let email = coachData["coachModule"]["coachData"]["email"];
let password = coachData["coachModule"]["coachData"]["password"];

describe("Article Test Cases", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.visit("/login");

    loginPage.loginUser(email, password);
  });
  it("Add Article With Valid Data", () => {
    cy.get(".sideMenuList > :nth-child(3)").click();

    cy.xpath(`//*[@id="app-view-container"]/div/div/div/div/div/div[1]/div[3]`)
      .first()
      .click();
  });
});
