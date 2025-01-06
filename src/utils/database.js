export class Database {
  static STORAGE_KEY = 'roulette_participants';

  static async init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  static async getParticipants() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return JSON.parse(data) || [];
  }

  static async addParticipant(participant) {
    const data = await this.getParticipants();
    const newParticipant = {
      ...participant,
      timestamp: new Date().toISOString()
    };
    data.push(newParticipant);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return newParticipant;
  }

  static async checkTicketNumber(ticketNumber) {
    const participants = await this.getParticipants();
    return participants.some(p => p.ticketNumber === ticketNumber);
  }

  static async generateReport() {
    const participants = await this.getParticipants();
    const report = {
      totalParticipants: participants.length,
      prizes: {},
      dateRange: {
        start: participants[0]?.timestamp,
        end: participants[participants.length - 1]?.timestamp
      }
    };

    participants.forEach(p => {
      if (!report.prizes[p.prize]) {
        report.prizes[p.prize] = 0;
      }
      report.prizes[p.prize]++;
    });

    return report;
  }

  static async clearData() {
    localStorage.removeItem(this.STORAGE_KEY);
    await this.init();
  }

  static async exportToCSV() {
    const participants = await this.getParticipants();
    const headers = ['Fecha', 'Nombre', 'Email', 'N° Boleta', 'Premio'];
    const csvData = participants.map(p => [
      new Date(p.timestamp).toLocaleString(),
      p.name,
      p.email,
      p.ticketNumber,
      p.prize
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  }
}
