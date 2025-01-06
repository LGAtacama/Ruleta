// src/components/AdminPanel.jsx

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../utils/firebase';

function AdminPanel({ onPrizesUpdate }) {
  const [prizes, setPrizes] = useState([]);
  const [newPrize, setNewPrize] = useState({ name: '', description: '', active: true, color: '#f54242' });

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    try {
      const prizesCollection = collection(db, "Premios");
      const snapshot = await getDocs(prizesCollection);
      const fetchedPrizes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrizes(fetchedPrizes);
    } catch (error) {
      console.error("Error al obtener premios:", error);
    }
  };

  const handleAddPrize = async () => {
    try {
      await addDoc(collection(db, "Premios"), newPrize);
      setNewPrize({ name: '', description: '', active: true, color: '#f54242' });
      fetchPrizes();
      onPrizesUpdate(); // Actualizar la ruleta
    } catch (error) {
      console.error("Error al agregar premio:", error);
    }
  };

  const handleToggleActive = async (prize) => {
    try {
      const prizeDoc = doc(db, "Premios", prize.id);
      await updateDoc(prizeDoc, { active: !prize.active });
      fetchPrizes();
      onPrizesUpdate(); // Actualizar la ruleta
    } catch (error) {
      console.error("Error al actualizar premio:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>

      <div className="add-prize">
        <h3>Agregar Nuevo Premio</h3>
        <input 
          type="text" 
          placeholder="Nombre del Premio" 
          value={newPrize.name} 
          onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Descripción del Premio" 
          value={newPrize.description} 
          onChange={(e) => setNewPrize({ ...newPrize, description: e.target.value })} 
        />
        <input 
          type="color" 
          value={newPrize.color} 
          onChange={(e) => setNewPrize({ ...newPrize, color: e.target.value })} 
        />
        <label>
          Activo:
          <input 
            type="checkbox" 
            checked={newPrize.active} 
            onChange={(e) => setNewPrize({ ...newPrize, active: e.target.checked })} 
          />
        </label>
        <button onClick={handleAddPrize}>Agregar Premio</button>
      </div>

      <div className="existing-prizes">
        <h3>Premios Existentes</h3>
        <ul>
          {prizes.map(prize => (
            <li key={prize.id}>
              <span>{prize.name} - {prize.description}</span>
              <button onClick={() => handleToggleActive(prize)}>
                {prize.active ? 'Desactivar' : 'Activar'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
