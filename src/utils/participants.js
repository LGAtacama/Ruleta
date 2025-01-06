import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

const csvWriter = createObjectCsvWriter({
  path: 'participants.csv',
  header: [
    { id: 'date', title: 'FECHA' },
    { id: 'name', title: 'NOMBRE' },
    { id: 'email', title: 'EMAIL' },
    { id: 'ticketNumber', title: 'N° BOLETA' },
    { id: 'prize', title: 'PREMIO' }
  ],
  append: true
});

export const saveParticipant = async (participantData) => {
  try {
    await csvWriter.writeRecords([{
      date: new Date().toLocaleString(),
      ...participantData
    }]);
    return true;
  } catch (error) {
    console.error('Error saving participant:', error);
    return false;
  }
};

export const checkTicketNumber = async (ticketNumber) => {
  // En una implementación real, esto debería verificar contra una base de datos
  // Por ahora, simularemos leyendo el CSV
  return false; // Retorna falso si el número no existe
};
