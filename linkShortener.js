/** ------------------------------------------------------------------------------
/** PASTE YOUR API LINK BETWEEN THE QUOTES OF THE apiKey VARIABLE
/** ------------------------------------------------------------------------------*/

const apiKey = 'PASTE_YOUR_API_KEY_HERE';  // paste your api key between the quotes
const tabName = 'shortened-links';  // the name of the spreadsheet tab for inserting shortned links

/** ------------------------------------------------------------------------------
/** BEWARE: EDITING BELOW THIS LINE MAY BREAK THE SCRIPT
/** ------------------------------------------------------------------------------*/

function linkShorty(urlToShorten) {
  try {
    const api = 'https://urlbae.com/api/url/add';
    const data = {url: urlToShorten};
    const params = {
      contentType: 'application/json',
      headers: {'Authorization': `Bearer ${apiKey}`},
      method: 'post',
      payload: JSON.stringify(data),
      escaping: false
    };

    const response = UrlFetchApp.fetch(api, params);
    const readableResponse = response.getContentText();
    const shorty = JSON.parse(readableResponse).shorturl;
    
    return shorty;

  } catch (err) {
    console.log(err);
  };
};

function spreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName);
};

function getLink() {
  const range = spreadsheet().getDataRange();
  const sheetValues = range.getValues();
  const link = sheetValues[sheetValues.length - 1][1];

  return link;
};

function insertLink() {
  const lastRow = spreadsheet().getLastRow();
  const cellLocation = `C${lastRow}`;
  const cell = spreadsheet().getRange(cellLocation);
  const link = getLink();

  if (link.length > 0 && cell.getValue.length === 0) {
    const shorty = linkShorty(link);
    cell.setValue(shorty);
  };
};