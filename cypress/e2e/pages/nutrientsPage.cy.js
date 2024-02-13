/// <reference types="cypress" />
require("cypress-xpath");
import "cypress-file-upload";

import nutrientSelectors, {
  coachName,
} from "../selectors/nutrientsSelectors.cy.js";
const apiUrl = Cypress.env("apiUrl");

export class NutrientPage {
  openNutrientPage() {
    cy.get(nutrientSelectors.SideMenuContent).click();
    cy.get(nutrientSelectors.nutrientsInSideMenu).click();
  }
  openCategoryPage() {
    cy.xpath(nutrientSelectors.nutrientsMealsXpath).find("div").first().click();
  }
  openSubCategoryPage() {
    cy.xpath(nutrientSelectors.nutrientsSubCategoriesMealsXpath)
      .find("img")
      .first()
      .click();
  }
  addNewCategory(imagePath, categoryName) {
    cy.xpath(nutrientSelectors.categoryImageXpath).attachFile(imagePath);
    // cy.xpath(
    //   `//*[@id="uploadComponent"]/div/div/div/span/div/div[1]/div/a/img`
    // );
    // .should("have.attr", "alt")
    // .and("include", imagePath, { setTimeout: 100000 });

    cy.wait(1000);
    cy.get(nutrientSelectors.categoryNameField).type(categoryName);
    cy.wait(2000);
    cy.get(nutrientSelectors.addNewCategorybutton).click();
  }

  async getCategoryData() {
    let response = await fetch(
      `${apiUrl}/meal-sub-categories/getSubCategory/1`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwiaWF0IjoxNzA0MTk3NzQ3LCJleHAiOjE3MDQyODQxNDd9.VgpQfws11LRQXFXz-jiOEO_mN7XdMJzpxPaZaG1uDTU",
        },
      }
    );

    return await response.json();
  }

  deleteCategory() {
    cy.xpath(nutrientSelectors.categoryActionsXpath).last().find("a").click();
    cy.xpath(nutrientSelectors.categoryDeleteActionXpath).click();
    cy.wait(1000);
    cy.get(nutrientSelectors.deleteButtonXpath).click();
  }
  openEditCategory() {
    cy.xpath(nutrientSelectors.categoryActionsXpath).last().find("a").click();
    cy.xpath(nutrientSelectors.categoryEditActionXpath).click();
    cy.wait(1000);
    //cy.get(nutrientSelectors.deleteButtonXpath).click();
  }
  clearCategoryName() {
    cy.get(nutrientSelectors.categoryNameField).clear();
  }
  clickSaveEditButton() {
    cy.get(nutrientSelectors.saveEditedButton).click();
  }
  editCateoryData(imagePath, categoryName, status) {
    if (imagePath == "" && categoryName != "") {
      this.clearCategoryName();

      cy.get(nutrientSelectors.categoryNameField).type(categoryName);
      status = "1";
    } else if (imagePath != "" && categoryName == "") {
      cy.xpath(nutrientSelectors.categoryImageXpath).attachFile(imagePath);
      cy.wait(3000);
      status = "2";
    } else if (imagePath != "" && categoryName != "") {
      this.clearCategoryName();

      cy.wait(1000);
      cy.xpath(nutrientSelectors.categoryImageXpath).attachFile(imagePath);
      cy.wait(1000);
      this.clearCategoryName();
      cy.get(nutrientSelectors.categoryNameField).type(categoryName);
      status = "3";
    }
    this.clickSaveEditButton();
    return status;
  }

  async getMealsItemData() {
    let response = await fetch(`${apiUrl}/meal-items/getItems/1`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwiaWF0IjoxNzA1NDA0Mjc2LCJleHAiOjE3MDU0OTA2NzZ9.g9VKNGNT92lqMkgmOCma-_uFYgtxs9Xbiel9ncNZYrk",
      },
    });

    return await response.json();
  }

  addNewMealItem(mealImagePath, mealName, mealPortionSize, mealRate) {
    cy.xpath(nutrientSelectors.categoryImageXpath).attachFile(mealImagePath);
    cy.get(nutrientSelectors.categoryNameField).type(mealName);
    cy.xpath('//*[@id="imageContainer"]')
      .find("div")
      .eq(mealPortionSize)
      .click();
    cy.xpath(`//*[@id="basic_ItemsRate"]/li[${mealRate}]`).click();

    // cy.get(nutrientSelectors.addNewCategorybutton).click();
  }
}

/* 

    cy.xpath(
      `//*[@id="uploadComponent"]/div/div/div/span/div/div/span/input`
    ).attachFile("pizza.jpeg",Cypress.Fil);
*/

/*



*/
