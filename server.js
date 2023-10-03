const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf2md = require('@opendocsg/pdf2md');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors()); // This will enable all CORS requests
const upload = multer({ storage: multer.memoryStorage() });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/api/convertPdfToMd', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    const pdfBuffer = req.file.buffer;
    const text = await pdf2md(pdfBuffer);

    res.status(200).json({ markdown: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
