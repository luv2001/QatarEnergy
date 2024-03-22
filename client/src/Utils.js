import * as XLSX from 'xlsx';

export const ArrayToExcel = ( field, service, from_date, to_date, completed_wells ) => {

    console.log(field);
    console.log(service);
    console.log(from_date);
    console.log(to_date);
    console.log(completed_wells);
    

  // Create Excel workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(completed_wells);

  // Add headers
  XLSX.utils.sheet_add_aoa(ws, [
    ['Title', `Completed Well List from date: ${from_date} to ${to_date}`],
    ['Field', field],
    ['Service', service],
    ['Well No.', 'Date'],
  ], { origin: -1 }); // Specify the starting cell

  // Merge cells for the title
  ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'CompletedWells');

  // Save the Excel file
  XLSX.writeFile(wb, `Completed_Wells_${from_date}_to_${to_date}.xlsx`);
};