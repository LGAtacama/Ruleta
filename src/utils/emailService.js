import { PRIZES, EMAIL_TEMPLATES } from './constants';

const getEmailTemplate = (customerData, prizeData) => {
  const validityDate = new Date();
  validityDate.setMonth(validityDate.getMonth() + 1);
  const validUntil = validityDate.toLocaleDateString();

  const isFreePrize = prizeData.id === 'EXPRESS_FACIAL' || prizeData.id === 'SMALL_DEPILATION';
  
  const template = isFreePrize ? 
    EMAIL_TEMPLATES.FREE_SERVICE : 
    EMAIL_TEMPLATES.DISCOUNT;

  return template(
    customerData.name,
    prizeData.option,
    customerData.ticketNumber,
    validUntil
  );
};

export const sendPrizeEmail = async (customerData, prizeId) => {
  const prizeData = PRIZES[prizeId];
  
  if (!prizeData || prizeId === 'TRY_AGAIN') return true;

  // En un entorno real, aquí se enviaría el email
  // Por ahora solo simulamos el envío
  console.log('Email enviado a:', customerData.email);
  console.log('Contenido:', getEmailTemplate(customerData, prizeData));
  
  return true;
};
