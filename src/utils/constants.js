export const PRIZES = {
  FACIAL_5: {
    id: 'FACIAL_5',
    name: '5% Desc. Faciales',
    option: '5% Desc. Faciales',
    description: '5% de descuento en tratamientos faciales',
    color: '#FF6B6B',
    validityNote: 'Válido por un mes - Uso único',
    active: true,
    order: 1
  },
  FACIAL_10: {
    id: 'FACIAL_10',
    name: '10% Desc. Faciales',
    option: '10% Desc. Faciales',
    description: '10% de descuento en tratamientos faciales',
    color: '#4ECDC4',
    validityNote: 'Válido por un mes - Uso único',
    active: true,
    order: 2
  },
  FACIAL_15: {
    id: 'FACIAL_15',
    name: '15% Desc. Faciales',
    option: '15% Desc. Faciales',
    description: '15% de descuento en tratamientos faciales',
    color: '#45B7D1',
    validityNote: 'Válido por un mes - Uso único',
    active: true,
    order: 3
  },
  DEPILATION_5: {
    id: 'DEPILATION_5',
    name: '5% desc. Depilación',
    option: '5% desc. Depilación',
    description: '5% de descuento en servicios de depilación',
    color: '#96CEB4',
    validityNote: 'Válido por un mes - Uso único',
    active: true,
    order: 4
  },
  DEPILATION_10: {
    id: 'DEPILATION_10',
    name: '10% Desc. Depilación',
    option: '10% Desc. Depilación',
    description: '10% de descuento en servicios de depilación',
    color: '#FFD93D',
    validityNote: 'Válido por un mes - Uso único',
    active: true,
    order: 5
  },
  DEPILATION_15: {
    id: 'DEPILATION_15',
    name: '15% Desc. Depilación',
    option: '15% Desc. Depilación',
    description: '15% de descuento en servicios de depilación',
    color: '#FF9F45',
    validityNote: 'Válido por un mes - Uso único',
    active: true,
    order: 6
  },
  MEDICAL_5: {
    id: 'MEDICAL_5',
    name: '5% desc. Trat.médicos',
    option: '5% desc. Trat.médicos',
    description: '5% de descuento en tratamientos médicos',
    color: '#B983FF',
    validityNote: 'Válido por un mes - Uso único',
    active: true,
    order: 7
  },
  MEDICAL_10: {
    id: 'MEDICAL_10',
    name: '10% Desc. Trat.médico',
    option: '10% Desc. Trat.médico',
    description: '10% de descuento en tratamientos médicos',
    color: '#94B49F',
    validityNote: 'Válido por un mes - Uso único',
    active: true,
    order: 8
  },
  EXPRESS_FACIAL: {
    id: 'EXPRESS_FACIAL',
    name: 'Limpieza Facial express',
    option: 'Limpieza Facial express',
    description: 'Una sesión de limpieza facial express gratuita',
    color: '#FF8882',
    validityNote: 'Válido por un mes - Un solo uso',
    active: true,
    order: 9
  },
  SMALL_DEPILATION: {
    id: 'SMALL_DEPILATION',
    name: '1 Sesión zona pequeña depilación',
    option: '1 Sesión zona pequeña depilación',
    description: 'Una sesión gratuita de depilación en zona pequeña',
    color: '#7286D3',
    validityNote: 'Válido por un mes - Un solo uso',
    active: true,
    order: 10
  },
  TRY_AGAIN: {
    id: 'TRY_AGAIN',
    name: 'Sigue participando',
    option: 'Sigue participando',
    description: '¡Gracias por participar!',
    color: '#888888',
    validityNote: null,
    active: true,
    order: 11
  }
};

export const DEFAULT_PRIZES = Object.values(PRIZES);
