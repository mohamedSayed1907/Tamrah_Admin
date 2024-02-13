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

    cy.visit("/login");
    loginPage.loginUser("admin", "admin");

    cy.fixture("categoryData").then((category) => {
      categoryImage = category.categoryImagePath;
      categoryName = category.categoryName + randomNumber;
      categoryImageEdited = category.editedCategoryImage;
      categoryNameEdited = category.editedCategoryName + randomNumber;

      mealImage = category.mealItemImagePath;
      mealName = category.mealItemName + randomNumber;
      mealImageEdited = category.editedmealItemImage;
      mealNameEdited = category.editedmealItemName + randomNumber;

      mealPortionSize = category.mealPortionSize;
      mealRate = category.mealRate;
      mealEditedPortionSize = category.mealEditedPortionSize;
      mealEditedRate = category.mealEditedRate;
    });
    nutrientPage.openNutrientPage();
  });

  it("Validate The Main Nutrients Meals Count", () => {
    cy.xpath(nutrientSelectors.nutrientsMealsXpath)
      .children()
      .should("have.length", "4");
  });
  it("Validate The Main Nutrients Meals  Names", () => {
    cy.xpath(nutrientSelectors.nutrientsMealsXpath)
      .children()
      .then((meals) => {
        for (let i = 0; i < meals.length; i++) {
          expect(meals[i].textContent).equal(mainMealsList[i]);
        }
      });
  });

  it("Validate The Main Category Count", () => {
    cy.xpath(nutrientSelectors.nutrientsMealsXpath)
      .children()
      .then((meals) => {
        for (let i = 0; i < meals.length; i++) {
          expect(meals[i].textContent).equal(mainMealsList[i]);
        }
      });
  });

  it("Validate The Length of Sub Category", async () => {
    let categoriesApi = await nutrientPage.getCategoryData();
    nutrientPage.openCategoryPage();
    cy.xpath(nutrientSelectors.subCategorySubMealsParentXpath)
      .children()
      .should("have.length", categoriesApi.data.length);
  });
  //Validate The Count of Meals of Each Sub Category
  it("Validate The Data of Sub Category", async () => {
    let categoriesApi = await nutrientPage.getCategoryData();
    nutrientPage.openCategoryPage();
    //Validate The Name of Each Sub Category
    cy.xpath(nutrientSelectors.subCategorySubMealsParentXpath)
      .children()
      .then((subCat) => {
        for (let i = 0; i < subCat.length; i++) {
          cy.get(`#cardNameContainer${i} > #subcategoryName${i}`).should(
            "have.text",
            categoriesApi.data[i]["name"]
          );
        }
      });
  });
  it("Validate The Number of Meals of Sub Category", async () => {
    let categoriesApi = await nutrientPage.getCategoryData();
    nutrientPage.openCategoryPage();
    //Validate The Name of Each Sub Category
    cy.xpath(nutrientSelectors.subCategorySubMealsParentXpath)
      .children()
      .then((subCat) => {
        for (let i = 0; i < subCat.length; i++) {
          cy.get(`:nth-child(${i + 1}) > #subcategoryCard1 > :nth-child(2) > p`)
            .invoke("text")
            .then((mealsCount) => {
              mealsCount = mealsCount.split(" ")[0];
              expect(mealsCount).contain(
                categoriesApi.data[i]["mealItems"].length
              );
            });
        }
      });
  });

  it("Validate Add Category with Valid Data ", () => {
    nutrientPage.openCategoryPage();
    cy.wait(1000);
    cy.get(nutrientSelectors.addCategoryModel).click();
    cy.wait(1000);
    nutrientPage.addNewCategory(categoryImage, categoryName);
    cy.get(nutrientSelectors.successToastNotification).should(
      "have.text",
      "You added the sub category successfully"
    );
  });
  it("Validate Add Category With Invalid Data ", () => {
    nutrientPage.openCategoryPage();
    cy.get(nutrientSelectors.addCategoryModel).click();
    cy.get(nutrientSelectors.addNewCategorybutton).click();
    cy.get(nutrientSelectors.uploadImageError).should(
      "have.text",
      "Please enter category image"
    );
    cy.get(nutrientSelectors.categoryNameError).should(
      "have.text",
      "Please enter category Name"
    );
  });

  it("Validate Delete Category", () => {
    nutrientPage.openCategoryPage();
    nutrientPage.deleteCategory();
    //Must Get The Elemeent Before Delete It
    cy.xpath(nutrientSelectors.categoryActionsXpath)
      .last()
      .find("h1")
      .invoke("text")
      .then((categoryNameText) => {
        cy.xpath(nutrientSelectors.allCategoriesCards).should(
          "not.contain.text",
          categoryNameText
        );
      });
  });

  it("Validate Edit Category with Valid Data ", () => {
    nutrientPage.openCategoryPage();
    nutrientPage.openEditCategory();
    let status = nutrientPage.editCateoryData(
      categoryImageEdited,
      categoryNameEdited
    );
    if (status == "1") {
      cy.xpath(nutrientSelectors.categoryActionsXpath)
        .last()
        .find("h1")
        .invoke("text")
        .then((categoryNameText) => {
          cy.xpath(nutrientSelectors.allCategoriesCards).should(
            "contain.text",
            categoryNameEdited
          );
        });
    } else if (status == "2") {
      cy.xpath(nutrientSelectors.categoryActionsXpath)
        .last()
        .find("img")
        .should("have.attr", "src")
        .should("include", categoryImageEdited);
    } else if (status == "3") {
      cy.xpath(nutrientSelectors.categoryActionsXpath)
        .last()
        .find("h1")
        .invoke("text")
        .then((categoryNameText) => {
          cy.xpath(nutrientSelectors.allCategoriesCards).should(
            "contain.text",
            categoryNameEdited
          );
        });
      cy.xpath(nutrientSelectors.categoryActionsXpath)
        .last()
        .find("img")
        .should("have.attr", "src")
        .should("include", categoryImageEdited);
    }
  });

  it("Validate Edit Category with Invalid Data ", () => {
    nutrientPage.openCategoryPage();
    nutrientPage.openEditCategory();
    nutrientPage.editCateoryData("", "{backspace}");
    cy.get(nutrientSelectors.categoryNameError).should(
      "have.text",
      "Please enter category Name"
    );
  });

  it("Validate The Meals Item Data", async () => {
    let response = await nutrientPage.getMealsItemData();
    nutrientPage.openCategoryPage();
    nutrientPage.openSubCategoryPage();

    cy.xpath(`//*[@id="tBody"]`)
      .children()
      .then((meals) => {
        expect(meals.length).equal(response.data.length);
      });
  });
  it("Validate The Meals Item Data", async () => {
    let response = await nutrientPage.getMealsItemData();
    nutrientPage.openCategoryPage();
    nutrientPage.openSubCategoryPage();

    cy.xpath(`//*[@id="tBody"]`)
      .children()
      .then((meals) => {
        for (let i = 0; i < meals.length; i++) {
          cy.xpath(`//*[@id="tBody"]`)
            .find("tr")
            .eq(i)
            .find("td")
            .eq(1)
            .invoke("text")
            .then((t) => {
              expect(t).equal(response.data[i].name);
            });
        }
      });
    console.log(response.data);
  });

  it("Validate The Meals Item Rate", async () => {
    let response = await nutrientPage.getMealsItemData();
    nutrientPage.openCategoryPage();
    nutrientPage.openSubCategoryPage();
    cy.xpath(`//*[@id="tBody"]`)
      .children()
      .then((meals) => {
        for (let i = 0; i < meals.length; i++) {
          cy.xpath(`//*[@id="tBody"]`)
            .find("tr")
            .eq(i)
            .find("td")
            .eq(3)
            .find("li.ant-rate-star-full")
            .then((rate) => {
              expect(rate.length).equal(response.data[i].rate);
            });
        }
      });
  });

  it.only("Validate Add Meal Item with Valid Data ", () => {
    nutrientPage.openCategoryPage();
    nutrientPage.openSubCategoryPage();
    cy.get('[data-cy="entityCreateButton"]').click();
    nutrientPage.addNewMealItem(
      mealImage,
      mealName,
      mealPortionSize - 1,
      mealRate
    );
    // cy.wait(1000);
    // cy.get(nutrientSelectors.addCategoryModel).click();
    // cy.wait(1000);
    // nutrientPage.addNewCategory(categoryImage, categoryName);
    // cy.get(nutrientSelectors.successToastNotification).should(
    //   "have.text",
    //   "You added the sub category successfully"
    // );
  });

  it("Validate Add Meal Item with Valid Data ", () => {
    nutrientPage.openCategoryPage();
    nutrientPage.openSubCategoryPage();
    cy.xpath(`//*[@id="tBody"]`)
      .find("tr")
      .eq(0)
      .invoke("text")
      .then((t) => {
        console.log("Test : ", t);
      });

    // cy.wait(1000);
    // cy.get(nutrientSelectors.addCategoryModel).click();
    // cy.wait(1000);
    // nutrientPage.addNewCategory(categoryImage, categoryName);
    // cy.get(nutrientSelectors.successToastNotification).should(
    //   "have.text",
    //   "You added the sub category successfully"
    // );
  });
});
