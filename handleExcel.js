const ExcelJS = require('exceljs');
const path = require('path');

// Ruta absoluta al archivo de Excel en la carpeta 'data'
const filePath = path.join(__dirname, 'data', 'file.xlsx');

// Crear una nueva instancia de Workbook (libro de trabajo)
const workbook = new ExcelJS.Workbook();

// Leer el archivo de Excel
workbook.xlsx.readFile(filePath)
  .then(() => {
    // Obtener la primera hoja de trabajo
    const worksheet = workbook.getWorksheet(1);

    // Iterar sobre cada fila de la hoja de trabajo, omitiendo la primera fila si es el encabezado
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Omitir encabezados si es necesario
        console.log(`Row ${rowNumber} = ${JSON.stringify(row.values)}`);
      }
    });
  })
  .catch(err => {
    console.error('Error reading the Excel file:', err);
  });
