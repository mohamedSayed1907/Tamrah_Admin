/// <reference types="cypress" />
import { ArticlePage } from "../pages/articlePage.cy.js";
import { ClientPage } from "../pages/clientPage.cy.js";
import { CoachPage } from "../pages/coachPage.cy.js";
import { LoginPage } from "../pages/loginPage.cy.js";
import coachSelector from "../selectors/coachSelector.cy.js";
import clientSelectors from "../selectors/clientSelectors.cy.js";
import nutrientSelectors from "../selectors/nutrientsSelectors.cy.js";

require("cypress-xpath");
import "cypress-wait-until";
import { NutrientPage } from "../pages/nutrientsPage.cy.js";
import loginCmd from "../../support/login.cmd.js";
import "cypress-file-upload";

const loginPage = new LoginPage();

const nutrientPage = new NutrientPage();
let clientNumber;
let name, coachName, coachEmail, email, coachPassword, coachGender;
let mainMealsList = ["Protein", "Carbohydrates", "Fat", "Vegetables"];
let categoryImage, categoryName, categoryNameEdited, categoryImageEdited;
let randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
let categoryDeletedName;
let mealImage,
  mealName,
  mealNameEdited,
  mealImageEdited,
  mealPortionSize,
  mealRate,
  mealEditedPortionSize,
  mealEditedRate;

describe("Coach Test Cases", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.visit("https://www.vdocipher.com/");
    cy.get('[href="/dashboard/login"] > .btn').click();
    cy.get("#login-email").type("karim.atef@mobidevlabs.com");
    cy.get("#login-password").type("K@rim1232909");
    cy.wait(1000);
    cy.xpath(`//*[@id="app"]/div/div/main/div/form/button`).click();
    cy.xpath(
      `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/main/div/div[1]/div[2]/div/div/a/div/div/div[2]`
    ).click();
    cy.get(".MuiGrid-container > :nth-child(3) > .MuiButtonBase-root").click();
    cy.xpath(`/html/body/div[6]/div[3]/ul/li[5]`).click();
  });

  it("Validate The Main Nutrients Meals Count", () => {
    cy.wait(2000);

    cy.get(":nth-child(131) > :nth-child(1) > .MuiButtonBase-root").click();
    cy.wait(3000);
    cy.xpath(
      `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div/div/div/div/table/tbody`
    )
      .children()
      .then((ch) => {
        for (let i = 0; i < ch.length; i++) {
          cy.xpath(
            `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div/div/div/div/table/tbody/tr[${
              i + 1
            }]/td[4]/button`
          ).click();
        }
      });

    //   .children()
    //   .then((ch) => {
    //     for (let i = 0; i < ch.length - 5; i++) {
    //       cy.xpath(
    //         `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div/div/div/div/table/tbody`
    //       )
    //         .find("tr")
    //         .eq(i)
    //         .find("td")
    //         .eq(3)
    //         .click({force:true})
    //     }
    //   });
  });
});
