module.exports = {
    clientSideMenuXpath:`//*[@id="itemContent_accountManagment"]/div[1]`,
    clientLinkXpath:`//*[@id="accountManagment"]/li[2]/a`,
 
    SuccessNotification:`.Toastify__toast-body`,

    //Delete Coach
    tableBody:"tbody",
    openActionsMenuXpath:`:nth-child(3) > .text-right > .menu > .ant-dropdown-trigger > .ant-space > :nth-child(1) > img`,
    deleteActionMenuXpath:`/html/body/div[2]/div/ul/li[2]/span`,
    clientDeleteButtonXpath:`[data-cy="entityConfirmDeleteButton"]`,

   // Assign Coach To Client
   assignCoachLinkXpath:`/html/body/div[2]/div/ul/li[1]/span`,
   replaceOrAssignClientButtonXpath:`//*[@id="tamrahApp.client.delete.question"]/div[2]/button`,
 
    //Replace Coach
    replaceActionMenuXpath:`/html/body/div[2]/div/ul/li[1]`,
    replaceLink:`[data-menu-id="rc-menu-uuid-58900-1-1"] > .ant-dropdown-menu-title-content`,
    replaceButton:`[data-cy="entityConfirmReplaceButton"]`,
      //BlockModel

      blockLink:"/html/body/div[2]/div/ul/li[3]",
      blockSuccess:"cy.xpath(clientSelectors.replaceActionMenuXpath).click()",

    blockOrUnblockActionMenuXpath:`/html/body/div[2]/div/ul/li[2]`,
    blockOrUnblockButton:`[data-cy="entityConfirmDeleteButton"]`,

    //Filteration
    unBlockChechBox:`.ant-checkbox-wrapper > :nth-child(2) > span`,
    //Search
    searchedInput:`.input-field`,
    selectCoachXpath:`//*[@id="tamrahApp.client.delete.question"]/div[1]/div`,
    errorMessageHint:`.alert > span`,
    allCoachesNameListXpath:`/html/body/div[4]/div/div/div[2]/div[1]/div/div`,




  
      
   
   
     
   } 