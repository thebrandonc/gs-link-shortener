function linkShorty(urlToShorten) {
  const api = 'https://urlbae.com/api/url/add';
  const apiKey = 'INSERT_API_KEY_HERE';
  const data = { url: urlToShorten };

  const params = {
    contentType: 'application/json',
    headers: {
      'Authorization': `Bearer ${apiKey}`
      },
    method: "post",
    payload: JSON.stringify(data),
    escaping: false
  };

  const response = UrlFetchApp.fetch(api, params);
  const parsedResponse = JSON.parse(response.getContentText());
  const shorty = parsedResponse.shorturl;

  return shorty;
};

function getLink() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const range = sheet.getDataRange();
  const sheetValues = range.getValues();
  const link = sheetValues[sheetValues.length - 1][1];

  return link;
};

function insertLink() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const lastRow = sheet.getLastRow();
  const cellLocation = `C${lastRow}`;
  const cell = sheet.getRange(cellLocation);
  const link = getLink();

  if (cell.getValue.length === 0 && link.length > 0) {
    const shorty = linkShorty(link);
    cell.setValue(shorty);
  };
};
