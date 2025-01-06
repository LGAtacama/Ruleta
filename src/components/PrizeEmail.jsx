import React from 'react';
import './PrizeEmail.css';

function PrizeEmail({ prize, customerData }) {
  const validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="email-container">
      <div className="email-content">
        <div className="email-header">
          <img 
            src="/logo-vitabella.png" 
            alt="Clínica Vitabella" 
            className="email-logo"
            onError={(e) => e.target.style.display = 'none'}
          />
          <h2>Clínica Vitabella</h2>
        </div>

        <div className="prize-notification">
          <h3>¡Felicitaciones {customerData.name}!</h3>
          <p className="win-message">Has ganado:</p>
          
          <div className="prize-box" style={{ backgroundColor: prize.color }}>
            <h4>{prize.name}</h4>
            <p>{prize.description}</p>
          </div>
        </div>

        <div className="prize-details">
          <div className="detail-row">
            <span>Cliente:</span>
            <span>{customerData.name}</span>
          </div>
          <div className="detail-row">
            <span>Email:</span>
            <span>{customerData.email}</span>
          </div>
          <div className="detail-row">
            <span>N° Boleta:</span>
            <span>{customerData.ticketNumber}</span>
          </div>
          <div className="detail-row">
            <span>Fecha de Emisión:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span>Válido hasta:</span>
            <span>{validUntil.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="terms-conditions">
          <h4>Términos y Condiciones:</h4>
          <ul>
            <li>Este premio es de un solo uso</li>
            <li>No es acumulable con otras promociones</li>
            <li>Válido solo hasta la fecha indicada</li>
            <li>Debe presentar este comprobante junto con su boleta original</li>
          </ul>
        </div>

        <div className="contact-info">
          <p>Para agendar su cita o consultas:</p>
          <p>📞 Teléfono: [Número de contacto]</p>
          <p>📧 Email: [Email de contacto]</p>
          <p>📍 Dirección: [Dirección de la clínica]</p>
        </div>

        <div className="footer">
          <p>¡Gracias por preferir Clínica Vitabella!</p>
          <small>Este documento es un comprobante oficial de su premio</small>
        </div>
      </div>

      <div className="email-actions">
        <button onClick={handlePrint} className="print-button">
          Imprimir Comprobante
        </button>
      </div>
    </div>
  );
}

export default PrizeEmail;
