/// <reference types="cypress" />
require("cypress-xpath");
import "cypress-file-upload";

import clientSelectors, { coachName } from "../selectors/clientSelectors.cy.js";

export class ClientPage {
  openClientPage() {
    cy.xpath(clientSelectors.clientSideMenuXpath).click();
    cy.xpath(clientSelectors.clientLinkXpath).click();
  }

 
 
  openActionsMenu() {
    cy.get(clientSelectors.openActionsMenuXpath).click();
  }
  openDeleteModel() {
    this.openActionsMenu();
    cy.xpath(clientSelectors.deleteActionMenuXpath).click();
  }

  deleteCoach() {
    this.openDeleteModel();
  }

  assignCoachToClient() {
    this.openActionsMenu();
    cy.get(clientSelectors.assignCoachLinkXpath).click();
  }

 

 

  //  deleteCoach()
  // {
  //   this.openDeleteModel();
  //   cy.get(clientSelectors.searchCoachInput).click();
  //   cy.xpath(clientSelectors.allCoachesNameListXpath).find("div").eq(1).click();

  //  // cy.get('div[title="Ahmed Sayed "]').click();

  // }

  async assignOrReplaceCoach() {
    let isAssign = "";
    isAssign = await this.isAssigned(2);
    if (isAssign.includes("...")) {
      console.log("Not Assign");
      this.openActionsMenu();

      this.assignCoach();
 
    } else {
      this.openActionsMenu();
      this.replaceCoach();
      console.log("Is Assign");
 
    }

    // cy.get(clientSelectors.searchCoachInput).click();
    // cy.xpath(clientSelectors.allCoachesNameListXpath).find("div").eq(1).click();
    // cy.get(clientSelectors.blockOrUnblockButton).click();
  }

 async assignCoach()
  {
    cy.xpath(clientSelectors.replaceActionMenuXpath).click();
    cy.xpath(clientSelectors.selectCoachXpath).click();
    let coachNameSelected = await this.getCoachNameFromList();
    console.log("From List ",coachNameSelected);
    cy.xpath(clientSelectors.allCoachesNameListXpath).find("div").eq(1).click();
    cy.xpath(clientSelectors.replaceOrAssignClientButtonXpath).click();
    cy.visit("/client");
    let CoachNameAfterReplaced = await this.getAssignedOrReplacedCoachName(2);
    console.log("From Table ",CoachNameAfterReplaced);
 
    expect(coachNameSelected).equal(CoachNameAfterReplaced);

  }
  async replaceCoach() {
    cy.xpath(clientSelectors.replaceActionMenuXpath).click();
    cy.xpath(clientSelectors.selectCoachXpath).click();
    let coachNameSelected = await this.getCoachNameFromList();
    cy.xpath(clientSelectors.allCoachesNameListXpath).find("div").eq(1).click();
    cy.xpath(clientSelectors.replaceOrAssignClientButtonXpath).click();
    cy.visit("/client");
    let CoachNameAfterReplaced = await this.getAssignedOrReplacedCoachName(2);
 
    expect(coachNameSelected).equal(CoachNameAfterReplaced);
  }
  getClientCount(rowNumber) {
    let clientNumber;

    const getClientNumber = new Promise((resolve) => {
      cy.get(clientSelectors.tableBody)
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
      cy.get(clientSelectors.tableBody)
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

  isAssigned(rowNumber) {
    let isAssigned;

    const getAssigned = new Promise((resolve) => {
      cy.get(clientSelectors.tableBody)
        .find("tr")
        .eq(rowNumber)
        .find("td")
        .eq(2)
        .invoke("text")
        .then((t) => {
          isAssigned = t;
          resolve(isAssigned);
        });
    });
    return getAssigned;
  }
  blockOrUnblockCoach(isBlocked) {
    if (isBlocked == "Blocked") {
    
        this.blockOrUnblockWithoutReplacement();
        console.log("No Is Actice");
 
       return "Active";
    
    } else {
   
        this.blockOrUnblockWithoutReplacement();
        console.log("No Is Blocked");

       return "Blocked";
      
    }

  }

  blockOrUnblockWithoutReplacement() {
    this.openActionsMenu();
    cy.xpath(clientSelectors.blockLink).click();

    cy.get(clientSelectors.blockOrUnblockButton).click();
//     cy.wait(500)
 
//  cy.reload();
  }

  

  searchByCoachName(coachName) {
    cy.get(clientSelectors.searchedInput).type(coachName);
  }

  getSearchErrorMessage() {
    let errorMessage;

    const getErrorMessage = new Promise((resolve) => {
      cy.get(clientSelectors.errorMessageHint)
        .invoke("text")
        .then((t) => {
          errorMessage = t;
          resolve(errorMessage);
        });
    });
    return getErrorMessage;
  }
  getAssignedOrReplacedCoachName(rowNumber) {
    let coachName;

    const getCoachName = new Promise((resolve) => {
      cy.get(clientSelectors.tableBody)
        .find("tr")
        .eq(rowNumber)
        .find("td")
        .eq(2)
        .invoke("text")
        .then((t) => {
          coachName = t;
          resolve(coachName);
        });
    });
    return getCoachName;
  }

  getCoachNameFromList() {
    let coachName;

    const getCoachName = new Promise((resolve) => {
      cy.xpath(clientSelectors.allCoachesNameListXpath)
        .find("div")
        .eq(1)
        .invoke("text")
        .then((t) => {
          coachName = t;
          resolve(coachName);
        });
    });
    return getCoachName;
  }
}
