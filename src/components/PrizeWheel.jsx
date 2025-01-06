// src/components/PrizeWheel.jsx

import React, { useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import './PrizeWheel.css';

function PrizeWheel({ mustSpin, prizeNumber, onStopSpinning, prizes }) {
  // Verificar que haya premios disponibles
  if (!prizes || prizes.length === 0) {
    return <div className="no-prizes-message">No hay premios activos disponibles</div>;
  }

  // Mapear los premios a la estructura esperada por la librería
  const data = prizes.map(prize => ({
    option: prize.name,
    style: { backgroundColor: prize.color || '#f54242' } // Color por defecto si no se define 'color'
  }));

  return (
    <div className="prize-wheel-container">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={onStopSpinning}
        textColors={['#ffffff']}
        outerBorderColor="#2c3e50"
        outerBorderWidth={3}
        innerRadius={0}
        radiusLineColor="#2c3e50"
        radiusLineWidth={1}
        fontSize={14}
        spinDuration={0.8}
      />
    </div>
  );
}

export default PrizeWheel;
