/// <reference types="cypress" />
require("cypress-xpath");
import "cypress-file-upload";
import "cypress-wait-until";

import chatSelectors from "../../selectors/coachModuleSelectors/chatSelectors.cy";

export class chatPage {
  openChatPage() {}
  setArabicName(arabicName) {
    cy.get(articleSelector.arabicName).type(arabicName);
  }
}
