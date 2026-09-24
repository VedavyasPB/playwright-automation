const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet, searchText);
    console.log(`${output.row} ${output.column}`)

    const cell = await worksheet.getCell(output.row, output.column + ChannelMergerNode.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
                console.log(`${output.row} ${output.column}`)
            }
        })
    })
    return output;
}

// writeExcelTest("Kivi", 350, { rowChange: 0, colChange: 2 }, "C:\\Users\\bhattar\\Downloads\\download.xlsx");


test('Upload download excel validation', async ({ page }) => {

    const textSearch = 'Mango';
    const updatedValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcelTest(textSearch, 350, { rowChange: 0, colChange: 2 }, "C:\\Users\\bhattar\\Downloads\\download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:\\Users\\bhattar\\Downloads\\download.xlsx"); //element should have the attribute type=file

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);

})
