// src/App.jsx

import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CustomerForm from './components/CustomerForm';
import PrizeWheel from './components/PrizeWheel';
import PrizeDisplay from './components/PrizeDisplay';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { Database } from './utils/database';
import { savePrizeToFirestore, fetchPrizesFromFirestore } from './utils/prizeService';
import './styles/main.css';

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [wheelKey, setWheelKey] = useState(0);
  const [activePrizes, setActivePrizes] = useState([]);

  // Verificar autenticación y claims de admin
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult(true); // Forzar actualización del token
        if (token.claims.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Cargar premios activos
  useEffect(() => {
    const fetchPrizes = async () => {
      console.log("Llamando a loadActivePrizes");
      await loadActivePrizes();
    };
    fetchPrizes();
  }, [wheelKey]);

  const loadActivePrizes = async () => {
    try {
      const prizes = await fetchPrizesFromFirestore();
      console.log("Premios obtenidos:", prizes);
      const active = prizes.filter(prize => prize.active);
      console.log("Premios activos:", active);
      setActivePrizes(active);
    } catch (error) {
      console.error("Error al cargar premios desde Firestore:", error);
      setActivePrizes([]);
    }
  };

  const handleSpinClick = async () => {
    if (!mustSpin && activePrizes.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * activePrizes.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setHasSpun(true);

      const selectedPrize = activePrizes[newPrizeNumber];
      
      try {
        console.log("Guardando premio en Firestore:", selectedPrize);
        await savePrizeToFirestore(customerData, selectedPrize);
        console.log("Añadiendo participante a la base de datos");
        await Database.addParticipant({
          ...customerData,
          prizeId: selectedPrize.id,
          prize: selectedPrize.name,
          timestamp: new Date().toISOString()
        });
        console.log("Premio guardado y participante añadido");
      } catch (error) {
        console.error("Error al guardar el premio:", error);
        setError('Hubo un error al guardar tu premio. Por favor, intenta nuevamente.');
        setMustSpin(false);
        setHasSpun(false);
      }
    }
  };

  const handleCustomerSubmit = async (data) => {
    try {
      console.log("Verificando número de boleta:", data.ticketNumber);
      const ticketExists = await Database.checkTicketNumber(data.ticketNumber);
      if (ticketExists) {
        setError('Este número de boleta ya participó');
        return;
      }
      setCustomerData(data);
      setShowForm(false);
      setError('');
    } catch (err) {
      console.error('Error al verificar el número de boleta:', err);
      setError('Error al verificar el número de boleta');
    }
  };

  const handleAdminLogin = (success) => {
    if (success) {
      setShowAdminLogin(false);
      setIsAdmin(true);
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="app-wrapper">
      <div className="main-title">
        <h1>Ruleta de la Suerte de Clínica Vitabella</h1>
      </div>

      <div className="app-container">
        {error && <div className="error-message">{error}</div>}

        {showAdminLogin && (
          <AdminLogin 
            onLogin={handleAdminLogin}
            onCancel={() => setShowAdminLogin(false)}
          />
        )}

        {isAdmin ? (
          <div className="admin-view">
            <div className="admin-header">
              <button onClick={() => setIsAdmin(false)} className="button button-secondary">
                Volver a la Ruleta
              </button>
            </div>
            <AdminPanel onPrizesUpdate={() => setWheelKey(prev => prev + 1)} />
          </div>
        ) : (
          !showAdminLogin && (
            <div className="content-container">
              {showForm ? (
                <CustomerForm onSubmit={handleCustomerSubmit} />
              ) : (
                <div className="game-container">
                  <div className="customer-info">
                    <h3>Cliente:</h3>
                    <p>Nombre: {customerData.name}</p>
                    <p>Email: {customerData.email}</p>
                    <p>N° Boleta: {customerData.ticketNumber}</p>
                  </div>

                  {activePrizes.length > 0 ? (
                    <>
                      <PrizeWheel
                        key={wheelKey}
                        mustSpin={mustSpin}
                        prizeNumber={prizeNumber}
                        onStopSpinning={() => setMustSpin(false)}
                        prizes={activePrizes}
                      />

                      <button 
                        className="button button-primary spin-button"
                        onClick={handleSpinClick} 
                        disabled={mustSpin || hasSpun}
                      >
                        {hasSpun ? '¡Ya has usado tu giro!' : '¡Girar!'}
                      </button>

                      {!mustSpin && hasSpun && activePrizes[prizeNumber] && (
                        <PrizeDisplay 
                          prize={activePrizes[prizeNumber]}
                          customerData={customerData}
                        />
                      )}
                    </>
                  ) : (
                    <div className="no-prizes-message">
                      No hay premios disponibles en este momento
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        )}

        {!isAdmin && !showAdminLogin && (
          <button 
            className="admin-access-button"
            onClick={() => setShowAdminLogin(true)}
            title="Acceso Administrador"
          >
            ?
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
