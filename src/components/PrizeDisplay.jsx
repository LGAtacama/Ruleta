// src/components/PrizeDisplay.jsx

import React, { useRef } from 'react';
import './PrizeDisplay.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PrizeDisplay({ prize, customerData }) {
  const printRef = useRef();

  const handleDownload = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Premio_${customerData.ticketNumber}.pdf`);
  };

  return (
    <div className="prize-display-overlay">
      <div className="prize-display-modal" ref={printRef}>
        <h2>¡Felicidades, {customerData.name}!</h2>
        <p>Has ganado: <strong>{prize.name}</strong></p>
        <p>{prize.description}</p>
        <p>Validez: {prize.validityNote || 'N/A'}</p>
        <button onClick={handleDownload} className="button button-primary">
          Descargar Premio
        </button>
        <button onClick={() => window.location.reload()} className="button button-secondary">
          Volver a la Ruleta
        </button>
      </div>
    </div>
  );
}

export default PrizeDisplay;
