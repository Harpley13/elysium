// routes/upload.js
const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const router = express.Router();

// Usar el directorio temporal '/tmp'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({ storage: storage });

router.post('/tarifas', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'Please upload a file' });
  }

  const workbook = XLSX.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  // Aquí debes procesar los datos y actualizarlos en tu base de datos
  // ...

  res.send({ message: 'Tarifas actualizadas correctamente', data });
});

module.exports = router;
