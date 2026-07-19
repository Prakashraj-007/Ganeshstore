const xlsx = require('xlsx');
const workbook = xlsx.readFile('Product_Bill_List.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);
console.log('Columns:', Object.keys(data[0] || {}));
console.log('First 3 rows:', data.slice(0, 3));
// check if there's a row with split=1
const splitRows = data.filter(r => r.split == 1 || r.split === '1');
console.log('Sample with split=1:', splitRows.slice(0, 2));
