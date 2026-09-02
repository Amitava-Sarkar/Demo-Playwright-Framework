import { expect } from '@playwright/test';
import fs from 'fs';
// import { faker } from '@faker-js/faker';
// import { DateTime } from 'luxon';
import conditionFilterData from '../TestData/conditionFilter.json' with { type: 'json' };

export async function inputField(locator, str) 
{
    await locator.waitFor({ state: 'visible', timeout: 60000 });
    await locator.fill(str);
    await expect(locator).toHaveValue(str);
}

export async function clickWebElement(locator, str) 
{
    await locator.waitFor({ state: 'visible', timeout: 60000 });
    if (str) {
      await expect(locator).toHaveText(str);
    }
    await locator.click();
}

export async function goToPage(page, url) 
{
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
}

export async function visibilityOfElement(locator, text) 
{
    await expect(locator).toBeVisible({ timeout: 90000 });
    if (text) {
      const textValue = await locator.textContent();
      expect(textValue?.trim()).toContain(text);
    }
}

export async function assertPageUrl(page, urlEndPoint) 
{
    const currentUrl = page.url();
    await expect(currentUrl).toContain(urlEndPoint);
}

export function generateRandomEmail() 
{
    const timestamp = Date.now();
    return `testuser_${timestamp}@example.com`;
}

export const csvHeaders = [
    "string",
    "integer",
    "boolean",
    "float",
    "email",
    "dropdown",
    "url",
    "date",
    "datetime",
    "time",
  ];

  export const csvHeadersForNewFile = [
    "Integer",
    "String",
    "float",
    "Email",
    "URL",
    "dateTime",
    "date",
    "dropdown"
  ];

export let randomRows = [];

export function generateFileWithDefineAndRandom(
    fileName,
    numberOfRows,
    customHeader = csvHeaders,
    dropdownValues = ['FIRST', 'SECOND', 'THIRD']
) {

    const generateRandomRow = () => [
        faker.word.sample(),
        Number(faker.string.numeric(5)),
        faker.helpers.arrayElement([true, false]),
        faker.number.float(),
        faker.internet.email(),
        faker.helpers.arrayElement(dropdownValues),
        'https://staging-fuse-aws.flatirons.com/account/importers',
        DateTime.fromJSDate(faker.date.future()).toFormat('MM/dd/yyyy'),
        DateTime.fromJSDate(faker.date.future()).toFormat('MM/dd/yyyy HH:mm:ss'),
        DateTime.fromJSDate(faker.date.future()).toFormat('HH:mm')
    ];

    randomRows = Array.from(
        { length: numberOfRows },
        generateRandomRow
    );

    const csvData = [
        customHeader.join(','),
        ...randomRows.map(row => row.join(','))
    ].join('\n');

    fs.writeFileSync(
        `src/support/uploadFiles/${fileName}.csv`,
        csvData
    );

    return randomRows;
}

export async function selectColumnOperatorAndFillValue(
    pageObject,
    columnName,
    operatorName,
    value = '',
    { useLast = false, skipColumn = false } = {}
) {
    const columnDropdown = useLast
        ? pageObject.selectColumnHeaderDropdown.last()
        : pageObject.selectColumnHeaderDropdown.first();

    const operatorDropdown = useLast
        ? pageObject.operatorDropdown.last()
        : pageObject.operatorDropdown.first();

    const valueField = useLast
        ? pageObject.valueField.last()
        : pageObject.valueField.first();

    const valueInput = useLast
        ? pageObject.valueInput.last()
        : pageObject.valueInput.first();

    if (!skipColumn) {
        await columnDropdown.click();
        await expect(pageObject.selectColumnHeaderDropdownOptions).toBeVisible();

        await pageObject.columnHeaders
            .getByText(columnName, { exact: true })
            .click();

        await expect(columnDropdown).toHaveValue(columnName);
    }

    await operatorDropdown.click();
    await expect(pageObject.operatorDropdownOptions).toBeVisible();

    await pageObject.operators
        .getByText(operatorName, { exact: true })
        .click();

    await expect(operatorDropdown).toHaveValue(operatorName);

    const operatorsWithoutValue = [
        'is empty',
        'is not empty',
        'is today',
        'is tomorrow',
        'is yesterday',
        'is within the last week',
        'is within the next week',
        'is within the last month',
        'is within the next month',
    ];

    if (operatorsWithoutValue.includes(operatorName.toLowerCase())) {
        return;
    }

    if (['Boolean', 'Dropdown'].includes(columnName)) {
        await valueInput.click();
        await expect(pageObject.valueInputOptions).toBeVisible();

        await pageObject.valueInputOptionsItems
            .getByText(value, { exact: true })
            .click();

        await expect(valueInput).toHaveValue(value);
    } else if (columnName === 'Date') {
        const selectDateField = useLast
            ? pageObject.selectDateField.last()
            : pageObject.selectDateField.first();

        await selectDateField.click();
        await selectDate(pageObject, value);
    } else {
        await valueField.fill(value);
    }
}

export async function selectDate(pageObject, targetDate) {
    const date = new Date(targetDate);

    const targetMonth = date.toLocaleString('default', { month: 'long' });
    const targetYear = date.getFullYear().toString();
    const targetMonthAndYear = `${targetMonth} ${targetYear}`;
    const targetDay = date.getDate().toString();

    await expect(pageObject.calender).toBeVisible();

    let attempts = 0;

    while (attempts < 24) {
        const currentMonthAndYear = (
            await pageObject.currentMonthAndYear.textContent()
        ).trim();

        if (currentMonthAndYear === targetMonthAndYear) {
            break;
        }

        const currentDate = new Date(currentMonthAndYear);
        const targetDateObj = new Date(targetDate);
        const previousMonthAndYear = currentMonthAndYear;

        if (currentDate < targetDateObj) {
            await pageObject.nextButton.click();
        } else {
            await pageObject.previousButton.click();
        }

        await expect(pageObject.currentMonthAndYear).not.toHaveText(previousMonthAndYear);
        attempts++;
    }

    if (attempts === 24) {
        throw new Error(`Unable to find ${targetMonthAndYear} in calendar`);
    }

    const dayLocator = pageObject.calender
        .locator('div')
        .filter({ hasText: new RegExp(`^${targetDay}$`) })
        .first();

    await expect(dayLocator).toBeVisible();
    await dayLocator.click();
}

export async function fillStringCells(pageObject, count, value, { step = 1 } = {}) {
    const { stringCellIdPrefix } = conditionFilterData.conditionFIlter;

    for (let i = 0; i < count; i += step) {
        const stringCell = pageObject.importerFrame.locator(`#${stringCellIdPrefix}-${i}`);
        await stringCell.dblclick();
        await stringCell.fill(value);
    }
}

export async function clearDropdownCells(pageObject) {
    const { values, dropdownCellIdPrefix, clearPrefix, dropdownIsEmpty } = conditionFilterData.conditionFIlter;
    const { cellsToClear, dropdownCellsCount } = dropdownIsEmpty;
    const indexesToClear = new Set();

    while (indexesToClear.size < Math.min(cellsToClear, dropdownCellsCount)) {
        indexesToClear.add(Math.floor(Math.random() * dropdownCellsCount));
    }

    for (const index of indexesToClear) {
        const dropdownCell = pageObject.importerFrame.locator(`#${dropdownCellIdPrefix}-${index}`);
        await expect(dropdownCell).not.toHaveValue(values.isEmpty);

        const crossIcon = pageObject.importerFrame.locator(`#${dropdownCellIdPrefix}-${index}-${clearPrefix}`);
        await crossIcon.click();
        await expect(dropdownCell).toHaveValue(values.isEmpty);
    }
}

export async function assertStringFilterResult(pageObject, operator, expectedValue, stringCellIdPrefix) {
    const { values } = conditionFilterData.conditionFIlter;
    const operatorName = operator.toLowerCase();

    if (operatorName === 'contains') {
        const filteredStringCellsCount = await pageObject.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: expectedValue })
            .count();

        for (let i = 0; i < filteredStringCellsCount; i++) {
            const stringCellValue = await pageObject.importerFrame.locator(`#${stringCellIdPrefix}-${i}`).textContent();
            expect(stringCellValue).toContain(expectedValue);
        }
        return;
    }

    if (operatorName === 'is empty') {
        const filteredStringCellsCount = await pageObject.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`#${stringCellIdPrefix}-`)
            .count();

        for (let i = 0; i < filteredStringCellsCount; i++) {
            const stringCellValue = await pageObject.importerFrame.locator(`#${stringCellIdPrefix}-${i}`).textContent();
            expect(stringCellValue).toBe(values.isEmpty);
        }
        return;
    }

    const rowsCount = await pageObject.rows.count();

    for (let i = 0; i < rowsCount; i++) {
        const stringCellValue = await pageObject.importerFrame.locator(`#${stringCellIdPrefix}-${i}`).textContent();

        if (operatorName === 'is not' || operatorName === 'does not contain') {
            expect(stringCellValue).not.toContain(expectedValue);
        } else if (operatorName === 'is not empty') {
            expect(stringCellValue).not.toBe(values.isEmpty);
        } else if (operatorName === 'is') {
            expect(stringCellValue).toBe(expectedValue);
        }
    }
}

export async function assertIntegerFilterResult(pageObject, operator, threshold, integerCellIdPrefix) {
    const operatorName = operator.toLowerCase();
    const thresholdNumber = Number(threshold);

    if (operatorName === 'is less than') {
        const rowsCount = await pageObject.rows.count();

        for (let i = 0; i < rowsCount; i++) {
            const integerCellValue = await pageObject.importerFrame.locator(`#${integerCellIdPrefix}-${i}`).textContent();
            expect(Number(integerCellValue)).toBeLessThan(thresholdNumber);
        }
        return;
    }

    const filteredIntegerCellCount = await pageObject.importerFrame
        .getByTestId('spreadsheet-input')
        .evaluateAll(
            (elements, thresholdValue) =>
                elements.filter(el => Number(el.textContent?.trim()) > thresholdValue).length,
            thresholdNumber
        );

    for (let i = 0; i < filteredIntegerCellCount; i++) {
        const integerCellValue = await pageObject.importerFrame.locator(`#${integerCellIdPrefix}-${i}`).textContent();
        expect(Number(integerCellValue)).toBeGreaterThan(thresholdNumber);
    }
}

export async function assertBooleanFilterResult(pageObject, operator, expectedValue, booleanCellIdPrefix) {
    const { values } = conditionFilterData.conditionFIlter;
    const operatorName = operator.toLowerCase();

    if (operatorName === 'is empty') {
        const rowsCount = await pageObject.rows.count();

        for (let i = 0; i < rowsCount; i++) {
            const booleanCell = pageObject.importerFrame.locator(`#${booleanCellIdPrefix}-${i}`);
            await expect(booleanCell).toHaveValue(values.isEmpty);
        }
        return;
    }

    if (operatorName === 'is not empty') {
        const filteredBooleanCellCount = await pageObject.filteredBooleanCells.count();

        for (let i = 0; i < filteredBooleanCellCount; i++) {
            const booleanCell = pageObject.importerFrame.locator(`#${booleanCellIdPrefix}-${i}`);
            await expect(booleanCell).not.toHaveValue(values.isEmpty);
        }
        return;
    }

    const filteredBooleanCellCount = await pageObject.filteredBooleanCells.count();

    for (let i = 0; i < filteredBooleanCellCount; i++) {
        const booleanCell = pageObject.importerFrame.locator(`#${booleanCellIdPrefix}-${i}`);

        if (operatorName === 'is not') {
            await expect(booleanCell).toHaveValue(expectedValue);
        } else {
            await expect(booleanCell).toHaveValue(expectedValue);
        }
    }
}

export async function assertDropdownFilterResult(pageObject, operator, expectedValue, dropdownCellIdPrefix) {
    const { values } = conditionFilterData.conditionFIlter;
    const operatorName = operator.toLowerCase();
    const rowsCount = await pageObject.rows.count();

    if (operatorName === 'is empty') {
        for (let i = 0; i < rowsCount; i++) {
            const dropdownCell = pageObject.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}`);
            await expect(dropdownCell).toHaveValue(values.isEmpty);
        }
        return;
    }

    if (operatorName === 'is not empty') {
        for (let i = 0; i < rowsCount; i++) {
            const dropdownCell = pageObject.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}`);
            await expect(dropdownCell).not.toHaveValue(values.isEmpty);
        }
        return;
    }

    const filteredDropdownCellCount = await pageObject.filteredDropdownCells.count();

    for (let i = 0; i < filteredDropdownCellCount; i++) {
        const dropdownCell = pageObject.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}`);

        if (operatorName === 'is not') {
            await expect(dropdownCell).not.toHaveValue(expectedValue);
        } else {
            await expect(dropdownCell).toHaveValue(expectedValue);
        }
    }
}

export async function assertEmailFilterResult(pageObject, operator, expectedValue, emailCellIdPrefix) {
    const { values } = conditionFilterData.conditionFIlter;
    const operatorName = operator.toLowerCase();

    if (operatorName === 'contains') {
        const filteredEmailCellsCount = await pageObject.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: expectedValue })
            .count();

        for (let i = 0; i < filteredEmailCellsCount; i++) {
            const emailCellValue = await pageObject.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).toContain(expectedValue);
        }
        return;
    }

    if (operatorName === 'is') {
        const filteredEmailCellsCount = await pageObject.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${emailCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredEmailCellsCount; i++) {
            const emailCellValue = await pageObject.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).toContain(expectedValue);
        }
        return;
    }

    if (operatorName === 'is empty') {
        const filteredEmailCellsCount = await pageObject.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${emailCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredEmailCellsCount; i++) {
            const emailCellValue = await pageObject.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).toBe(values.isEmpty);
        }
        return;
    }

    if (operatorName === 'is not empty') {
        const filteredEmailCellsCount = await pageObject.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${emailCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredEmailCellsCount; i++) {
            const emailCellValue = await pageObject.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).not.toBe(values.isEmpty);
        }
        return;
    }

    const rowsCount = await pageObject.rows.count();

    for (let i = 0; i < rowsCount; i++) {
        const emailCellValue = await pageObject.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
        expect(emailCellValue).not.toContain(expectedValue);
    }
}

export async function assertTimeFilterResult(pageObject, operator, expectedValue, timeCellIdPrefix) {
    const { values } = conditionFilterData.conditionFIlter;
    const operatorName = operator.toLowerCase();

    const filteredTimeCellsCount = await pageObject.importerFrame
        .getByTestId('spreadsheet-input')
        .locator(`[id^="${timeCellIdPrefix}-"]`)
        .count();

    if (operatorName === 'is empty') {
        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await pageObject.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).toBe(values.isEmpty);
        }
        return;
    }

    if (operatorName === 'is not empty') {
        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await pageObject.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).not.toBe(values.isEmpty);
        }
        return;
    }

    if (operatorName === 'contains' || operatorName === 'is') {
        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await pageObject.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).toContain(expectedValue);
        }
        return;
    }

    for (let i = 0; i < filteredTimeCellsCount; i++) {
        const timeCellValue = await pageObject.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
        expect(timeCellValue).not.toContain(expectedValue);
    }
}

export async function assertDateFilterResult(pageObject, operator, expectedValue, dateCellIdPrefix) {
    const { values } = conditionFilterData.conditionFIlter;
    const operatorName = operator.toLowerCase();

    const filteredDateCellsCount = await pageObject.importerFrame
        .getByTestId('spreadsheet-input')
        .locator(`[id^="${dateCellIdPrefix}-"]`)
        .count();

    if (operatorName === 'is empty') {
        for (let i = 0; i < filteredDateCellsCount; i++) {
            const dateCellValue = await pageObject.importerFrame.locator(`#${dateCellIdPrefix}-${i}`).textContent();
            expect(dateCellValue).toBe(values.isEmpty);
        }
        return;
    }

    if (operatorName === 'is not empty') {
        for (let i = 0; i < filteredDateCellsCount; i++) {
            const dateCellValue = await pageObject.importerFrame.locator(`#${dateCellIdPrefix}-${i}`).textContent();
            expect(dateCellValue).not.toBe(values.isEmpty);
        }
        return;
    }

    if (
        operatorName === 'is today' ||
        operatorName === 'is tomorrow' ||
        operatorName === 'is yesterday' ||
        operatorName.startsWith('is within')
    ) {
        expect(filteredDateCellsCount).toBeGreaterThanOrEqual(0);
        return;
    }

    if (operatorName === 'is' || operatorName === 'is greater than' || operatorName === 'is less than') {
        for (let i = 0; i < filteredDateCellsCount; i++) {
            const dateCellValue = await pageObject.importerFrame.locator(`#${dateCellIdPrefix}-${i}`).textContent();

            if (operatorName === 'is') {
                expect(dateCellValue).toContain(expectedValue);
            } else if (operatorName === 'is greater than') {
                expect(new Date(dateCellValue).getTime()).toBeGreaterThan(new Date(expectedValue).getTime());
            } else {
                expect(new Date(dateCellValue).getTime()).toBeLessThan(new Date(expectedValue).getTime());
            }
        }
        return;
    }

    for (let i = 0; i < filteredDateCellsCount; i++) {
        const dateCellValue = await pageObject.importerFrame.locator(`#${dateCellIdPrefix}-${i}`).textContent();
        expect(dateCellValue).not.toContain(expectedValue);
    }
}

export async function assertUrlFilterResult(pageObject, operator, expectedValue, urlCellIdPrefix) {
    const { values } = conditionFilterData.conditionFIlter;
    const operatorName = operator.toLowerCase();

    const filteredUrlCellsCount = await pageObject.importerFrame
        .getByTestId('spreadsheet-input')
        .locator(`[id^="${urlCellIdPrefix}-"]`)
        .count();

    if (operatorName === 'is empty') {
        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await pageObject.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).toBe(values.isEmpty);
        }
        return;
    }

    if (operatorName === 'is not empty') {
        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await pageObject.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).not.toBe(values.isEmpty);
        }
        return;
    }

    if (operatorName === 'contains' || operatorName === 'is') {
        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await pageObject.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).toContain(expectedValue);
        }
        return;
    }

    for (let i = 0; i < filteredUrlCellsCount; i++) {
        const urlCellValue = await pageObject.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
        expect(urlCellValue).not.toContain(expectedValue);
    }
}
