/// <reference types="cypress" />
import { ArticlePage } from "../pages/articlePage.cy.js";
import { LoginPage } from "../pages/loginPage.cy.js";
import articleSelectors from "../selectors/articleSelectors.cy.js";
import loginSelector from "../selectors/loginSelectors.cy.js";
require("cypress-xpath");

const loginPage = new LoginPage();
const articlePage = new ArticlePage();
let arabicName, englishName, dayNumber, dayOrder;
let randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
describe("Article Test Cases", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.visit("/login");

    loginPage.loginUser("admin", "admin");

    articlePage.openAddArticlePage();

    cy.fixture("articleData").then((articleData) => {
      arabicName = articleData.arabicName + randomNumber;
      englishName = articleData.englishName + randomNumber;
      dayNumber = articleData.dayNumber;
      dayOrder = articleData.dayOrder;
    });
  });
  it("Add Article With Valid Data", () => {
    articlePage.addPublishedArticleWithValidData(
      arabicName,
      englishName,
      dayNumber,
      dayOrder
    );
    cy.contains(englishName).should("be.visible");
  });
});
