// pages/api/convertPdfToMd.js
import multer from 'multer';
import nextConnect from 'next-connect';
import pdf2md from '@opendocsg/pdf2md';

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
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

export default apiRoute;
