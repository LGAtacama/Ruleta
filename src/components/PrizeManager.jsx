import React, { useState, useEffect } from 'react';
import { PRIZES } from '../utils/constants';
import './PrizeManager.css';

function PrizeManager({ onPrizesUpdate }) {
  const [prizes, setPrizes] = useState([]);
  const [editingPrize, setEditingPrize] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPrizes();
  }, []);

  const loadPrizes = () => {
    const storedPrizes = localStorage.getItem('roulette_prizes');
    if (!storedPrizes) {
      // Si no hay premios guardados, usar los predeterminados
      const defaultPrizes = Object.values(PRIZES);
      localStorage.setItem('roulette_prizes', JSON.stringify(defaultPrizes));
      setPrizes(defaultPrizes);
    } else {
      setPrizes(JSON.parse(storedPrizes));
    }
  };

  const updatePrizes = (updatedPrizes) => {
    setPrizes(updatedPrizes);
    localStorage.setItem('roulette_prizes', JSON.stringify(updatedPrizes));
    if (onPrizesUpdate) {
      onPrizesUpdate();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const prizeData = {
      id: editingPrize ? editingPrize.id : `PRIZE_${Date.now()}`,
      name: formData.get('name'),
      option: formData.get('name'), // Aseguramos que option y name sean iguales
      description: formData.get('description'),
      color: formData.get('color'),
      validityNote: formData.get('validityNote'),
      active: true,
      order: editingPrize ? editingPrize.order : prizes.length + 1
    };

    const updatedPrizes = editingPrize 
      ? prizes.map(p => p.id === editingPrize.id ? prizeData : p)
      : [...prizes, prizeData];

    updatePrizes(updatedPrizes);
    setShowForm(false);
    setEditingPrize(null);
  };

  const togglePrizeStatus = (id) => {
    const updatedPrizes = prizes.map(prize => 
      prize.id === id ? { ...prize, active: !prize.active } : prize
    );
    updatePrizes(updatedPrizes);
  };

  const deletePrize = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este premio?')) {
      const updatedPrizes = prizes.filter(prize => prize.id !== id);
      updatePrizes(updatedPrizes);
    }
  };

  const resetToDefault = () => {
    if (window.confirm('¿Estás seguro de restablecer todos los premios a sus valores predeterminados?')) {
      const defaultPrizes = Object.values(PRIZES);
      updatePrizes(defaultPrizes);
    }
  };

  return (
    <div className="prize-manager">
      <div className="prize-manager-header">
        <h2>Gestión de Premios</h2>
        <div className="header-buttons">
          <button onClick={() => setShowForm(true)} className="add-button">
            Agregar Premio
          </button>
          <button onClick={resetToDefault} className="reset-button">
            Restablecer Premios
          </button>
          <button onClick={onPrizesUpdate} className="update-wheel-button">
            Actualizar Ruleta
          </button>
        </div>
      </div>

      <div className="prizes-list">
        {prizes
          .sort((a, b) => a.order - b.order)
          .map(prize => (
            <div 
              key={prize.id} 
              className={`prize-item ${!prize.active ? 'inactive' : ''}`}
              style={{ borderLeft: `4px solid ${prize.color}` }}
            >
              <div className="prize-content">
                <h4>{prize.option || prize.name}</h4>
                <p>{prize.description}</p>
                {prize.validityNote && <small>{prize.validityNote}</small>}
              </div>
              
              <div className="prize-actions">
                <button
                  onClick={() => {
                    setEditingPrize(prize);
                    setShowForm(true);
                  }}
                  className="edit-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => togglePrizeStatus(prize.id)}
                  className={prize.active ? 'deactivate-button' : 'activate-button'}
                >
                  {prize.active ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => deletePrize(prize.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </div>
            </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h3>{editingPrize ? 'Editar Premio' : 'Nuevo Premio'}</h3>
              
              <div className="form-group">
                <label>Nombre del Premio:</label>
                <input
                  name="name"
                  defaultValue={editingPrize?.name || editingPrize?.option}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  name="description"
                  defaultValue={editingPrize?.description}
                  required
                />
              </div>

              <div className="form-group">
                <label>Color:</label>
                <input
                  type="color"
                  name="color"
                  defaultValue={editingPrize?.color || '#FF6B6B'}
                />
              </div>

              <div className="form-group">
                <label>Nota de Validez:</label>
                <input
                  name="validityNote"
                  defaultValue={editingPrize?.validityNote || 'Válido por un mes - Uso único'}
                />
              </div>

              <div className="button-group">
                <button type="submit">
                  {editingPrize ? 'Guardar Cambios' : 'Crear Premio'}
                </button>
                <button type="button" onClick={() => {
                  setShowForm(false);
                  setEditingPrize(null);
                }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrizeManager;
