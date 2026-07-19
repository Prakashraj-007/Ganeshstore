const fs = require('fs');
const xlsx = require('xlsx');

const workbook = xlsx.readFile('Product_Bill_List.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

const splitProducts = data
  .filter(row => row.split == 1 || row.split === '1')
  .map(row => row['Product Name (English)'])
  .filter(Boolean);

const tsContent = `// Auto-generated list of products that allow decimal quantities
export const SPLIT_PRODUCTS = new Set([
${splitProducts.map(name => `  "${name.replace(/"/g, '\\"')}",`).join('\n')}
]);
`;

fs.writeFileSync('src/lib/split_products.ts', tsContent);
console.log('Successfully generated src/lib/split_products.ts');
