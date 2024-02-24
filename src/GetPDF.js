import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PdfListPage = () => {
  const [pdfList, setPdfList] = useState([]);

  useEffect(() => {
    // Fetch all PDF documents from the server
    const fetchPdfList = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-all-pdfs');
        setPdfList(response.data);
      } catch (error) {
        console.error('Error fetching PDF list:', error);
      }
    };

    fetchPdfList();
  }, []);

  return (
    <div>
      <h2>PDF List</h2>
      <ul>
        {pdfList.map((pdf) => (
          <li key={pdf.id}>
            <a href={`/api/get-pdf/${pdf.id}`} target="_blank" rel="noopener noreferrer">{pdf.filename}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfListPage;
