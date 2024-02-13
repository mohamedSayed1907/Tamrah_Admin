/// <reference types="cypress" />
import { ArticlePage } from "../pages/articlePage.cy.js";
import { ClientPage } from "../pages/clientPage.cy.js";
import { CoachPage } from "../pages/coachPage.cy.js";
import { LoginPage } from "../pages/loginPage.cy.js";
import coachSelector from "../selectors/coachSelector.cy.js"
import clientSelectors from "../selectors/clientSelectors.cy.js"

require('cypress-xpath');
import 'cypress-wait-until';

 
const loginPage = new LoginPage();
const clientPage = new ClientPage();
let clientNumber;
let name,coachName,coachEmail,email,coachPassword,coachGender;
  
describe("Coach Test Cases", () => {
 
beforeEach(()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
 
      cy.visit("/login")
      loginPage.loginUser("admin","admin")
       clientPage.openClientPage()
 
 
})


it("Validate Delete Client",   () => {
     clientPage.openDeleteModel();
      cy.xpath(coachSelector.coachDeleteButtonXpath).click()
      
      cy.get(clientSelectors.SuccessNotification).should("be.visible").should("have.text","You deleted client successfully")
}); 
it("Validate Assign Coach To Client", async  () => {

 console.log();
  clientPage.assignOrReplaceCoach();


}); 


 
it.only("Validate Block Coach", async  () => {
 const coachStatusBeforeTakeAction = await clientPage.getStatus(0);
 console.log("Before " , coachStatusBeforeTakeAction);
 let isBlocked = clientPage.blockOrUnblockCoach(coachStatusBeforeTakeAction)
 console.log("Before" , isBlocked);
 cy.visit("/client");
 const coachStatusAfterTakeAction = await clientPage.getStatus(0);
 console.log("coachStatusAfterTakeAction" , coachStatusAfterTakeAction);

 expect(coachStatusAfterTakeAction).equal(isBlocked)


 }); 
 


 
 it("Validate Filter Using Un Assign Status", async  () => {
 
   cy.get(coachSelector.unBlockChechBox).click();
   cy.get(clientSelectors.tableBody).find("tr").find("td").eq(2).contains("td", "...");
 
 });

 it("Validate Search Using Coach Name", async  () => {
  name = "Mohamed"
   clientPage.searchByCoachName(name)
  cy.get(clientSelectors.tableBody).find("tr").find("td").eq(0).contains("td",name );
 
 });
 it("Validate Search Using Coach Name That Doesn't Exist", async  () => {
  cy.wait(1000)
  clientPage.searchByCoachName("masjnajdsjkfjkas")
  cy.get("table")
    .find("tr")
    .then((row) => {
       console.log(row.length);
          expect(row.length.toString()).equal("1")

    });
  //let errorMessage = await coachPage.getSearchErrorMessage()
  
 });
 

});
 
 


