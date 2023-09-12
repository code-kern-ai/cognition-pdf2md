// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [markdown, setMarkdown] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);

    try {
      const res = await fetch('/api/convertPdfToMd', {
        method: 'POST',
        body: formData,
      });

      const { markdown } = await res.json();
      setMarkdown(markdown);
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <input type="file" name="file" />
        <button type="submit">Upload and Convert</button>
      </form>
      <div>
        <h2>Converted Markdown:</h2>
        <pre>{markdown}</pre>
      </div>
    </div>
  );
}
