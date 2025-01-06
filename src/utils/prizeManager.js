export class PrizeManager {
  static STORAGE_KEY = 'roulette_prizes';

  static getDefaultPrizes() {
    return {
      FACIAL_5: {
        id: 'FACIAL_5',
        option: '5% Desc. Faciales',
        color: '#FF6B6B',
        description: '5% de descuento en tratamientos faciales - Un solo uso',
        validityNote: 'Válido por un mes - Uso único',
        active: true,
        order: 1
      },
      FACIAL_10: {
        id: 'FACIAL_10',
        option: '10% Desc. Faciales',
        color: '#4ECDC4',
        description: '10% de descuento en tratamientos faciales - Un solo uso',
        validityNote: 'Válido por un mes - Uso único',
        active: true,
        order: 2
      },
      // ... resto de premios por defecto
    };
  }

  static init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.getDefaultPrizes()));
    }
  }

  static getPrizes() {
    const prizes = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return Object.values(prizes)
      .filter(prize => prize.active)
      .sort((a, b) => a.order - b.order);
  }

  static getAllPrizes() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
  }

  static savePrize(prize) {
    const prizes = this.getAllPrizes();
    prizes[prize.id] = {
      ...prize,
      lastModified: new Date().toISOString()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prizes));
  }

  static deletePrize(prizeId) {
    const prizes = this.getAllPrizes();
    delete prizes[prizeId];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prizes));
  }

  static togglePrizeStatus(prizeId) {
    const prizes = this.getAllPrizes();
    if (prizes[prizeId]) {
      prizes[prizeId].active = !prizes[prizeId].active;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prizes));
    }
  }

  static reorderPrizes(newOrder) {
    const prizes = this.getAllPrizes();
    newOrder.forEach((prizeId, index) => {
      if (prizes[prizeId]) {
        prizes[prizeId].order = index + 1;
      }
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prizes));
  }
}
