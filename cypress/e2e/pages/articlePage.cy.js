/// <reference types="cypress" />
require("cypress-xpath");
import "cypress-file-upload";
import "cypress-wait-until";

import articleSelector from "../selectors/articleSelectors.cy.js";

export class ArticlePage {
  openAddArticlePage() {
    cy.get(articleSelector.contentSideMenu).click();
    cy.get(articleSelector.articleLinkSideMenu).click();
    cy.get(articleSelector.addButtonPage).click();
  }
  setArabicName(arabicName) {
    cy.get(articleSelector.arabicName).type(arabicName);
  }
  setEnglishName(englishName) {
    cy.get(articleSelector.englishName).type(englishName);
  }
  setDayNumber(dayNumber) {
    cy.get(articleSelector.dayNumber).type(dayNumber);
  }
  setDayOrder(dayOrder) {
    cy.get(articleSelector.dayOrder).type(dayOrder);
  }
  uploadPdf() {
    cy.get(articleSelector.openPdfUploader).click({ force: true });
    cy.xpath(
      `//*[@id="app-view-container"]/div[1]/div/div/div/div[2]/div/form/div[4]/div[2]/div/div/span/div[1]/span/input`
    ).attachFile("articlePdf.pdf");
  }
  uploadImage() {
    cy.get(articleSelector.openImageUploader).click();
    cy.xpath(
      `//*[@id="app-view-container"]/div[1]/div/div/div/div[2]/div/form/div[4]/div[2]/div/div/span/div[1]/span/input`
    ).attachFile("articleImage.png");
  }
  uploadRecord() {
    cy.get(articleSelector.openRecordUploader).click();
    cy.xpath(articleSelector.uploadRecordXpath).attachFile("articleAudio.mp3");
  }
  saveAndPublish() {
    cy.get(articleSelector.savePublishedButton).click();
  }
  saveAndDraft() {
    cy.get(articleSelector.saveDraftButton).click();
  }

  addPublishedArticleWithValidData(
    arabicName,
    englishName,
    dayNumber,
    dayOrder
  ) {
    this.setArabicName(arabicName);
    this.setEnglishName(englishName);
    this.setDayNumber(dayNumber);
    cy.wait(500);
    this.setDayOrder(dayOrder);

    this.uploadImage();
    this.uploadPdf();
    this.uploadRecord();
    cy.get(
      ":nth-child(4) > .d-flex > .w-75 > .list-item-display > .item"
    ).should("be.visible", { setTimeout: 10000 });
    cy.get(
      ":nth-child(5) > .d-flex > .w-75 > .list-item-display > .item"
    ).should("be.visible", { setTimeout: 10000 });
    cy.get(
      ":nth-child(6) > .d-flex > .w-75 > .list-item-display > .item"
    ).should("be.visible", { setTimeout: 10000 });
    this.saveAndPublish();
  }
  addPublishedArticleWithInvalidData(
    arabicName,
    englishName,
    dayNumber,
    dayOrder
  ) {
    this.setArabicName("");
    this.setEnglishName(englishName);
    this.setDayNumber(dayNumber);
    cy.wait(500);
    this.setDayOrder(dayOrder);

    this.uploadImage();
    this.uploadPdf();
    this.uploadRecord();
    cy.get(
      ":nth-child(4) > .d-flex > .w-75 > .list-item-display > .item"
    ).should("be.visible", { setTimeout: 10000 });
    cy.get(
      ":nth-child(5) > .d-flex > .w-75 > .list-item-display > .item"
    ).should("be.visible", { setTimeout: 10000 });
    cy.get(
      ":nth-child(6) > .d-flex > .w-75 > .list-item-display > .item"
    ).should("be.visible", { setTimeout: 10000 });
    this.saveAndPublish();
  }

  addDraftArticleWithValidData() {}
  addDraftArticleWithInvalidData() {}
}
