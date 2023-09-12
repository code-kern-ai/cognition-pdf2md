// pages/api/convertPdfToMd.js
import multer from 'multer';
import pdf2md from '@opendocsg/pdf2md';

const upload = multer({ storage: multer.memoryStorage() }).single('file');

export default async function convertPdfToMd(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    try {
      const pdfBuffer = req.file.buffer;
      const text = await pdf2md(pdfBuffer);
      return res.status(200).json({ markdown: text });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
}
