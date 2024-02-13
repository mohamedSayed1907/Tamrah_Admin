module.exports = {
    clientSideMenuXpath:`//*[@id="itemContent_accountManagment"]/div[1]`,
    coachLinkXpath:`//*[@id="accountManagment"]/li[3]/a`,
    //add Coach
    inviteCoachButton:`[data-cy="entityCreateButton"]`,
    coachName:"#basic_firstName",
    coachEmail:"#basic_email",
    coachGenderMaleXpath:`//*[@id="basic_gender"]/label[1]/span[1]/input`,
    coachGenderFemaleXpath:`//*[@id="basic_gender"]/label[2]/span[1]/input`,
    coachPassword:"#basic_password",
    addButton:`[data-cy="entityConfirmDeleteButton"]`,
    errorUsername:"#basic_firstName_help > .ant-form-item-explain-error",
    errorEmail:"#basic_email_help > .ant-form-item-explain-error",
    errorPassword:"#basic_password_help > .ant-form-item-explain-error",
    //Invitation Model
    invitationSharedModel:`[data-cy="coachShareDialogHeading"]`,
    sharedCoachName:".coachData > :nth-child(1) > h1",
    sharedCoachEmail:":nth-child(3) > h1",
    sharedCoachPassword:":nth-child(2) > h1",

    //Delete Coach
    tableBody:".tableBody",
    deleteActionMenuXpath:`/html/body/div[2]/div/ul/li[3]`,
    coachNameDeletedXpath:`//*[@id="tamrahApp.coach.delete.question"]/div[1]/h2`,
    coachDeleteButtonXpath:`//*[@id="jhi-confirm-delete-coach"]`,
    searchCoachInput:`.ant-select-selector`,
    allCoachesNameListXpath:`/html/body/div[4]/div/div/div[2]/div[1]/div/div`,
    //Replace Coach
    replaceActionMenuXpath:`/html/body/div[2]/div/ul/li[4]`,
    replaceButton:`[data-cy="entityConfirmReplaceButton"]`,
      //BlockModel

    blockOrUnblockActionMenuXpath:`/html/body/div[2]/div/ul/li[1]`,
    blockOrUnblockButton:`[data-cy="entityConfirmDeleteButton"]`,

    //Filteration
    unBlockChechBox:`.ant-checkbox-wrapper > :nth-child(2) > span`,
    //Search
    searchedInput:".input-field",
    errorMessageHint:`.alert > span`



  
      
   
   
     
   } 