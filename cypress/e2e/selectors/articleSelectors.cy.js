module.exports = {
  contentSideMenu: "#itemContent_dataManagment > .itemContent",
  articleLinkSideMenu: "#dataManagment > :nth-child(1) > a",
  addButtonPage: `[data-cy="entityCreateButton"]`,
  arabicName: `[data-cy="nameAr"]`,
  englishName: `[data-cy="nameEn"]`,
  dayNumber: `[data-cy="dayNumber"]`,
  dayOrder: `[data-cy="order"]`,

  openPdfUploader: `.article-button-surrounded > :nth-child(1)`,
  openImageUploader: `.article-button-surrounded > :nth-child(2)`,
  openRecordUploader: `.article-info-button`,
  uploadPdfXpath: `//*[@id="app-view-container"]/div[1]/div/div/div/div[2]/div/form/div[4]/div[2]/div/div/span/div[1]/span/input`,
  uplaodImageXpath: `//*[@id="app-view-container"]/div[1]/div/div/div/div[2]/div/form/div[5]/div[2]/div/div/span/div[1]/span/input`,
  uploadRecordXpath: `//*[@id="app-view-container"]/div[1]/div/div/div/div[2]/div/form/div[6]/div[2]/div/div/span/div[1]/span/input`,
  savePublishedButton: `.btn-primary > span`,
  saveDraftButton: `.btn-info > span`,
  allArticlesListXpath: `//*[@id="app-view-container"]/div/div/div/div`,
};
