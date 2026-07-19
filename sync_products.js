const { createClient } = require('@supabase/supabase-js');
const xlsx = require('xlsx');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function syncProducts() {
  console.log("Reading Excel file...");
  const workbook = xlsx.readFile('Product_Bill_List.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  console.log(`Found ${data.length} products in Excel.`);

  console.log("Preparing data for insertion...");
  const newProducts = data.map(row => {
    const sellingPrice = parseFloat(row['Selling Price'] || 0);
    const mrp = sellingPrice; 
    
    return {
      name: row['Product Name (English)'] || 'Unknown',
      name_tamil: row['Product Name (Tamil)'] || null,
      name_tanglish: row['Tanglish'] || null,
      selling_price: sellingPrice,
      mrp: mrp,
      category: 'Uncategorized'
      // Omitted 'split' column since it is not in the db schema
    };
  });

  console.log("Inserting new products...");
  // Insert in batches
  for (let i = 0; i < newProducts.length; i += 50) {
    const batch = newProducts.slice(i, i + 50);
    const { error: insertError } = await supabase.from('products').insert(batch);
    if (insertError) {
      console.error("Error inserting products:", insertError);
      return;
    }
    console.log(`Inserted batch ${Math.floor(i / 50) + 1}`);
  }

  console.log("Sync completed successfully!");
}

syncProducts();
