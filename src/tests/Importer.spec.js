import { test } from '../support/Fixture/testFixture';

import data2 from '../support/TestData/importer.json' with { type: 'json' };


test.describe('Importer Feature', () => {

  test.beforeEach('Verify that user is able to navigate to importer page', async ({ importer }) => {

    await importer.navigateToImporterPage();

  });

  test.skip('Verify the visibility of all elements present in importer page', async ({ importer }) => {

    await importer.elementVisibility();

  });

  test('Verify the functionality of Create Importer button', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();

  });

  test('Verify visibility of all elements present under upload csv popup', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.elementVisibilityOfUploadCSVButton();

  });

  test('Verify user is able to create an importer manually', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input)
    await importer.importerDeletion();

  });


  test('Verify user is able to create an importer via file uploading', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreationViaUploadingFile(data2.uploadFiles.unmatchedColumnCsv);
    
  })

  test('Verify user is able to delete an importer', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.importerDeletion();

  })

  test('Verify user is able to add a column in importer', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.addColumnFunctionality(data2.input);
    await importer.importerDeletion();

  })

  test('Verify user is able to add a column in importer with validation', async ({ importer }) => {

    await importer.clickOnCreateImporterButton()
    await importer.importerCreation(data2.input);
    await importer.addColumnFunctionalityWithValidation();
    await importer.importerDeletion();
  })

  test('Verify user is able to edit importer name', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.editImporterName();

  })  

  test('Verify import file button is disabled when no column is added' , async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.verifyImportFileButtonIsDisabled();
    await importer.importerDeletion();
   
  })

  test('Verify import file button is enabled when column is added' , async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.addColumnFunctionality(data2.input);
    await importer.verifyImportFileButtonIsEnabled();
    await importer.importerDeletion();
  })

  test('Verify user is able to edit column details', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreationViaUploadingFile(data2.uploadFiles.unmatchedColumnCsv);
    await importer.columnEditFunctionality();
    await importer.importerDeletion();
  })

  test('Verify user is able to delete a column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreationViaUploadingFile(data2.uploadFiles.unmatchedColumnCsv);
    await importer.columnDeleteFunctionality();
    await importer.importerDeletion();
  })

  test('Verify user is able to undo the column deletion', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreationViaUploadingFile(data2.uploadFiles.unmatchedColumnCsv);
    await importer.columnDeleteFunctionality();
    await importer.columnUndoDeletionFunctionality();
    await importer.importerDeletion();
  })

  test('Verify user is able to create a string type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.stringTypeColumnCreation(data2.input)
    await importer.importerDeletion();
  })

  test('Verify user is able to create a integer type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.integerTypeColumnCreation(data2.input)
    await importer.importerDeletion();
  })

  test('Verify user is able to create a float type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.floatTypeColumnCreation()
    await importer.importerDeletion();
  })

  test('Verify user is able to create a boolean type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.booleanTypeColumnCreation()
    await importer.importerDeletion();
  })

  test('Verify user is able to create a Email type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.emailTypeColumnCreation()
    await importer.importerDeletion();
  })

  test('Verify user is able to create a URL type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.urlTypeColumnCreation()
    await importer.importerDeletion();
  })

  test('Verify user is able to create a Dropdown type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dropdownTypeColumnCreation()
    await importer.importerDeletion();
  })

  test('Verify user is able to create a Date type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnCreation()
    await importer.importerDeletion();
  })

  test('Verify user is able to create a Date-Time type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTimeTypeColumnCreation()
    await importer.importerDeletion();
  })

  test('Verify user is able to create a Time type column', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.timeTypeColumnCreation()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MM/dd/yyyy', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMDdYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMM dd yyyy', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMDdYyyy()
    await importer.importerDeletion();
  })

 test('Verify that user is able to add a column with date data type with format yyyy-MM-dd', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatYyyyMMDd()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd/MM/yyyy', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMMYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MM-dd-yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMDdYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format yyyy/MM/dd', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatYyyyMMDd()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd-MMMM-yyyy', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMMMMYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMMM dd, yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMMDdCommaYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd/MM/yy', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMMYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMMM dd, yy', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMMDdCommaYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format yy/MM/dd', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatYyMMDd()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MM-dd-yy', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMDdYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format M-dd-yy', async ({ importer }) => {

    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMDdYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd-MM-yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMMYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd-MM-yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMMYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd-M-yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MM/dd/yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMDdYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format M/dd/yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMDdYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MM.dd.yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMDotDdDotYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format M.dd.yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMDotDdDotYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMM-dd-yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMDdYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMMM-dd-yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMMDdYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd-MMM-yy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMMMYy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format yyyy-M-dd', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatYyyyDashMDashDd()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format M-dd-yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMDashDdDashYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format M/dd/yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMDdYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd/M/yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format yyyy/M/dd', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatYyyyMDd()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd.MM.yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdDotMMDotYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd.M.yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdDotMDotYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format yyyy.MM.dd', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatYyyyDotMMDotDd()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format yyyy.M.dd', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatYyyyDotMDotDd()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMM. dd, yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMDotDdCommaYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd MMM. yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdMMMDotYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMM dd', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMDd()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMMM dd', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMMDd()
    await importer.importerDeletion();
  })  

  test('Verify that user is able to add a column with date data type with format MMM d', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMD()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format MMMM d', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatMMMMD()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format dd. MMM. yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDdDotSpaceMMMDotSpaceYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format EEE, MMM dd, yyyy', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatEEECommaMMMDdCommaYyyy()
    await importer.importerDeletion();
  })

  test('Verify that user is able to add a column with date data type with format Day Day-of-Month Month Year', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreation(data2.input);
    await importer.dateTypeColumnWithFormatDayDayOfMonthMonthYear()
    await importer.importerDeletion();
  })

  test('Verify that user is able to import a file', async ({ importer }) => {
    await importer.clickOnCreateImporterButton();
    await importer.importerCreationViaUploadingFile(data2.uploadFiles.unmatchedColumnCsv);
    await importer.fileImportFunctionality();
    await importer.importerDeletion();
  })

 
});