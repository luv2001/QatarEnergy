import React from 'react';
import Papa from 'papaparse';

const DownloadExcel = ({ data }) => {
  const createCSV = () => {
    const csvData = [];
    csvData.push(['well', 'service', 'field', 'date']); // Header

    data.data.forEach((item) => {
      const row = [item.well, item.service, item.field, item.date_done];
      csvData.push(row);
    });

    const csv = Papa.unparse(csvData);
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'excel_data.csv'; 
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={createCSV}>Download Excel</button>
  );
};

export default DownloadExcel;
