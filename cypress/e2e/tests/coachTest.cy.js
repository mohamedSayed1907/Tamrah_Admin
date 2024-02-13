/// <reference types="cypress" />
import { ArticlePage } from "../pages/articlePage.cy.js";
import { CoachPage } from "../pages/coachPage.cy.js";
import { LoginPage } from "../pages/loginPage.cy.js";
import coachSelector from "../selectors/coachSelector.cy.js";
require("cypress-xpath");
import "cypress-wait-until";

const loginPage = new LoginPage();
const coachPage = new CoachPage();
let clientNumber;
let name, coachName, coachEmail, email, coachPassword, coachGender;

describe("Coach Test Cases", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.visit("/login");
    loginPage.loginUser("admin", "admin");
    coachPage.openAddCoachPage();
    cy.fixture("coachData").then((coachData) => {
      name = coachData.coachName;
      email = coachData.coachEmail;
      coachPassword = coachData.coachPassword;
      coachGender = coachData.coachGender;
      coachName = `${name}+${Math.random().toString().slice(2, 6)}`;

      coachEmail = `${email}+${Math.random().toString().slice(2, 6)}@gmail.com`;
    });
  });
  it("Validate Invite Coach With Valid Data", () => {
    coachPage.openAddPage();
    coachPage.addCoachWithValidData(
      coachName,
      coachEmail,
      coachGender,
      coachPassword
    );

    cy.get(".Toastify__toast-body")
      .should("be.visible")
      .should("have.text", "Couch has been created successfully");
    cy.get("").contains("td", "ahmed");
  });
  it("Validate Invite Coach With Invalid Data", () => {
    coachPage.openAddPage();
    coachPage.addCoachWithInvalidData();
    cy.get(coachSelector.errorUsername).should(
      "have.text",
      "this feild doesn't accept spaces"
    );
    cy.get(coachSelector.errorEmail).should(
      "have.text",
      "Please enter a valid email address"
    );
  });
  it("Validate Invite Coach With Exisiting Email", () => {
    coachPage.openAddPage();
    coachPage.addCoachWithExisitngEmailBefore(
      coachName,
      "sagedmohamed1@gmail.com"
    );
    cy.get(coachSelector.errorEmail).should(
      "have.text",
      "email Already in use"
    );
  });
  it("Validate Invite Coach With Password Less Than 6 Character ", () => {
    coachPage.openAddPage();
    coachPage.addCoachWithPasswordLessThan6CharBefore(
      coachName,
      coachEmail,
      "123"
    );
    cy.get(coachSelector.errorPassword).should(
      "have.text",
      "The password Must Be At Least 6 Character"
    );
  });
  it("Validate Invite Coach Data", () => {
    coachPage.openAddPage();

    coachPage.addCoachWithValidData(
      coachName,
      coachEmail,
      coachGender,
      coachPassword
    );
    cy.get(coachSelector.invitationSharedModel).should("be.visible");
    cy.get(coachSelector.sharedCoachName)
      .should("be.visible")
      .should("have.text", coachName);
    cy.get(coachSelector.sharedCoachEmail)
      .should("be.visible")
      .should("have.text", coachEmail);
    cy.get(coachSelector.sharedCoachPassword)
      .should("be.visible")
      .should("have.text", coachPassword);
  });

  it("Validate Delete Coach", () => {
    cy.get(coachSelector.tableBody)
      .find("tr")
      .eq(-1)
      .within(() => {
        cy.get("td").eq(1).getTextFromElement().as("clientNum");
      });
    cy.get("@clientNum").then((clientNumber) => {
      coachPage.deleteCoach(clientNumber);
    });

    cy.xpath(coachSelector.coachNameDeletedXpath)
      .getTextFromElement()
      .as("name");
    cy.xpath(coachSelector.coachDeleteButtonXpath).click();
    cy.get("@name").then((name) => {
      cy.get("table td").should("not.contain.text", name);
    });
  });

  it.only("Validate Replace Coach", async () => {
    let firstBeforeUpdated;
    let lastBeforeUpdated;
    let firstAfterUpdated;
    let lastAfterUpdated;
    let sum;

    firstBeforeUpdated = await coachPage.getClientCount(1);
    lastBeforeUpdated = await coachPage.getClientCount(0);
    console.log("Which I Want To Replace Before : ", firstBeforeUpdated);
    console.log("Which Replaced With Who Before: ", lastBeforeUpdated);
    coachPage.replaceCoach();
    cy.visit("/coach");
    sum = parseInt(firstBeforeUpdated) + parseInt(lastBeforeUpdated);
    firstAfterUpdated = await coachPage.getClientCount(1);
    lastAfterUpdated = await coachPage.getClientCount(0);
    console.log("Which I Want To Replace  After : ", firstAfterUpdated);
    console.log("Which Replaced With Who After : ", lastAfterUpdated);
    console.log("Sum Is : ", sum);
    console.log(parseInt(firstBeforeUpdated) + parseInt(lastBeforeUpdated));

    expect(lastAfterUpdated).contain(sum);
    expect(firstAfterUpdated).contain(0);
  });

  it("Validate Block Coach", async () => {
    const clientCount = await coachPage.getClientCount(2);
    console.log("Count : ", clientCount);
    const coachStatusBeforeTakeAction = await coachPage.getStatus(2);
    console.log("Status Before : ", coachStatusBeforeTakeAction);

    let isBlocked = coachPage.blockOrUnblockCoach(
      coachStatusBeforeTakeAction,
      clientCount
    );
    console.log("isBlocked", isBlocked);
    const coachStatusAfterTakeAction = await coachPage.getStatus(2);
    console.log("coachStatusAfterTakeAction", coachStatusAfterTakeAction);

    expect(coachStatusAfterTakeAction).equal(isBlocked);
  });

  it("Validate Filter Using unBlock Status", async () => {
    cy.wait(2000);

    cy.get(coachSelector.unBlockChechBox).click();
    cy.get(".tableBody").find("tr").find("td").eq(5).contains("td", "Blocked");
  });

  it("Validate Search Using Coach Name", async () => {
    cy.wait(1000);
    coachPage.searchByCoachName(name);
    cy.get(".tableBody").find("tr").find("td").eq(0).contains("td", name);
  });
  it("Validate Search Using Coach Name That Doesn't Exist", async () => {
    cy.wait(1000);
    coachPage.searchByCoachName(coachName);
    let errorMessage = await coachPage.getSearchErrorMessage();
    expect(errorMessage).equal("No Coaches found");
  });
});
