/// <reference types="cypress" />
require("cypress-xpath");
import "cypress-file-upload";

import coachSelector, { coachName } from "../selectors/coachSelector.cy.js";

export class CoachPage {
  openAddCoachPage() {
    cy.xpath(coachSelector.clientSideMenuXpath).click();
    cy.xpath(coachSelector.coachLinkXpath).click();
  }
  openAddPage() {
    cy.get(coachSelector.inviteCoachButton).click();
  }
  setCoachName(coachName) {
    cy.get(coachSelector.coachName).type(coachName);
  }
  setCoachEmail(coachEmail) {
    cy.get(coachSelector.coachEmail).type(coachEmail);
  }
  setCoachGender(gender) {
    if (gender == "MALE") {
      cy.xpath(coachSelector.coachGenderMaleXpath).click();
    } else if (gender == "FEMALE") {
      cy.xpath(coachSelector.coachGenderFemaleXpath).click();
    }
  }
  setCoachPassword(coachPassword) {
    cy.get(coachSelector.coachPassword).type(coachPassword);
  }
  clickInviteCoach() {
    cy.get(coachSelector.addButton).click();
  }
  addCoachWithValidData(coachName, coachEmail, gender, coachPassword) {
    this.setCoachName(coachName);
    this.setCoachEmail(coachEmail);
    this.setCoachPassword(coachPassword);
    this.setCoachGender(gender);

    this.clickInviteCoach();
  }
  addCoachWithInvalidData() {
    this.setCoachName(" ");
    this.setCoachEmail(" ");
    this.setCoachPassword("123456");

    this.clickInviteCoach();
  }
  addCoachWithExisitngEmailBefore(name, email) {
    this.setCoachName(name);

    this.setCoachEmail(email);
    this.setCoachGender("MALE");

    this.setCoachPassword("123456");
    this.clickInviteCoach();
  }
  addCoachWithPasswordLessThan6CharBefore(name, email) {
    this.setCoachName(name);

    this.setCoachEmail(email);
    this.setCoachGender("MALE");

    this.setCoachPassword("123");
    this.clickInviteCoach();
  }

  deleteCoach(clientNumber) {
    if (clientNumber == 0) {
      this.deleteWithoutReplacement();
      console.log(clientNumber);
    } else {
      this.deleteWithReplacement();
      console.log(clientNumber);
    }
  }
  openDeleteModel() {
    cy.get(coachSelector.tableBody)
      .find("tr")
      .eq(-1)
      .within(() => {
        cy.get("td").eq(6).click();
        cy.xpath(coachSelector.deleteActionMenuXpath).click();
      });
  }

  openReplaceModel() {
    cy.get(coachSelector.tableBody)
      .find("tr")
      .eq(1)
      .within(() => {
        cy.get("td").eq(6).click();
        cy.xpath(coachSelector.replaceActionMenuXpath).click();
      });
  }

  openBlockeModel() {
    cy.get(coachSelector.tableBody)
      .find("tr")
      .eq(2)
      .within(() => {
        cy.get("td").eq(6).click();
        cy.xpath(coachSelector.blockOrUnblockActionMenuXpath).click();
      });
  }
  deleteWithoutReplacement() {
    this.openDeleteModel();
  }

  deleteWithReplacement() {
    this.openDeleteModel();
    cy.get(coachSelector.searchCoachInput).click();
    cy.xpath(coachSelector.allCoachesNameListXpath).find("div").eq(1).click();

    // cy.get('div[title="Ahmed Sayed "]').click();
  }

  replaceCoach() {
    this.openReplaceModel();
    cy.get(coachSelector.searchCoachInput).click();
    cy.xpath(coachSelector.allCoachesNameListXpath).find("div").eq(1).click();
    cy.get(coachSelector.replaceButton).click();
  }

  getClientCount(rowNumber) {
    let clientNumber;

    const getClientNumber = new Promise((resolve) => {
      cy.get(coachSelector.tableBody)
        .find("tr")
        .eq(rowNumber)
        .find("td")
        .eq(1)
        .invoke("text")
        .then((t) => {
          clientNumber = t;
          resolve(clientNumber);
        });
    });
    return getClientNumber;
  }
  getStatus(rowNumber) {
    let status;

    const getStatus = new Promise((resolve) => {
      cy.get(coachSelector.tableBody)
        .find("tr")
        .eq(rowNumber)
        .find("td")
        .eq(5)
        .invoke("text")
        .then((t) => {
          status = t;
          resolve(status);
        });
    });
    return getStatus;
  }
  blockOrUnblockCoach(isBlocked, clientCount) {
    if (isBlocked == "Blocked") {
      if(clientCount==0)
      {
        console.log("Blocked And Has Zero Clients");
        this.blockOrUnblockWithoutReplacement();

      }else{
        this.blockOrUnblockWithReplacement();
        console.log("Blocked But Not Zero Clients");

      }

      return "Active";
    } else {
      if(clientCount==0)
      {
        console.log("Blocked And Has Zero Clients");

        this.blockOrUnblockWithoutReplacement();

      }else{
       this.blockOrUnblockWithReplacement();
        console.log("Blocked But Not Zero Clients");

      }

      return "Blocked";
    }
  }

  blockOrUnblockWithoutReplacement() {
    this.openBlockeModel();
    cy.get(coachSelector.blockOrUnblockButton).click();
    cy.visit("/coach");

  }

  blockOrUnblockWithReplacement() {
    this.openBlockeModel();
    cy.get(coachSelector.searchCoachInput).click();
    cy.xpath(coachSelector.allCoachesNameListXpath).find("div").eq(1).click();
    cy.get(coachSelector.blockOrUnblockButton).click();
    cy.visit("/coach");

    // cy.get('div[title="Ahmed Sayed "]').click();
  }

  searchByCoachName(coachName) {
    cy.get(coachSelector.searchedInput).type(coachName);
  }

  getSearchErrorMessage() {
    let errorMessage;

    const getErrorMessage = new Promise((resolve) => {
      cy.get(coachSelector.errorMessageHint)
        .invoke("text")
        .then((t) => {
          errorMessage = t;
          resolve(errorMessage);
        });
    });
    return getErrorMessage;
  }
}
