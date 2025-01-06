// src/utils/prizeService.js

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

// Función para obtener los premios desde Firestore
export const fetchPrizesFromFirestore = async () => {
  try {
    const prizesCollection = collection(db, "Premios"); // Asegúrate de que el nombre de la colección es correcto
    const snapshot = await getDocs(prizesCollection);
    const prizes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Premios obtenidos desde Firestore:", prizes); // Log
    return prizes;
  } catch (error) {
    console.error("Error al obtener premios desde Firestore:", error);
    return [];
  }
};

// Función para generar mensajes de premios
export const generatePrizeMessage = (customerData, prize, validUntil) => {
  const isFreePrize = prize.id === "EXPRESS_FACIAL" || prize.id === "SMALL_DEPILATION";

  return {
    title: `¡Felicitaciones ${customerData.name}!`,
    prizeDetails: {
      name: prize.name,
      description: prize.description,
      validUntil,
      ticketNumber: customerData.ticketNumber,
    },
    instructions: isFreePrize
      ? [
          "Agenda tu cita mencionando este premio",
          "Premio válido para UN SOLO USO",
          `Debes usar tu premio antes de: ${validUntil}`,
          "Presenta este comprobante y tu boleta el día de tu cita",
        ]
      : [
          "Este descuento es de UN SOLO USO",
          "No es acumulable con otras promociones",
          "Válido solo durante el mes indicado",
          "Presenta este comprobante junto con tu boleta",
        ],
    validityNote: "Premio personal e intransferible",
  };
};

// Función para guardar premios en Firestore
export const savePrizeToFirestore = async (customerData, prizeData) => {
  const validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 1);

  const prizeRecord = {
    ...customerData,
    prizeId: prizeData.id,
    prizeName: prizeData.name,
    timestamp: new Date().toISOString(),
    validUntil: validUntil.toISOString(),
    used: false,
  };

  try {
    const docRef = await addDoc(collection(db, "SavedPrizes"), prizeRecord); // Cambia "SavedPrizes" si es necesario
    console.log("Premio guardado con ID:", docRef.id);
    return {
      ...prizeRecord,
      prizeMessage: generatePrizeMessage(
        customerData,
        prizeData,
        validUntil.toLocaleDateString()
      ),
    };
  } catch (error) {
    console.error("Error al guardar el premio en Firestore:", error);
    throw error;
  }
};
