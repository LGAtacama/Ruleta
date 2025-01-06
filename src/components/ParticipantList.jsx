import React, { useState, useEffect } from 'react';
import { Database } from '../utils/database';

function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    const data = await Database.getParticipants();
    setParticipants(data);
  };

  const filteredParticipants = participants.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.email.toLowerCase().includes(filter.toLowerCase()) ||
    p.ticketNumber.includes(filter)
  );

  const downloadCSV = () => {
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

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `participantes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="participant-list">
      <div className="list-header">
        <input
          type="text"
          placeholder="Buscar por nombre, email o boleta..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />
        <button onClick={downloadCSV} className="download-button">
          Descargar CSV
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>N° Boleta</th>
              <th>Premio</th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipants.map((p, index) => (
              <tr key={index}>
                <td>{new Date(p.timestamp).toLocaleString()}</td>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.ticketNumber}</td>
                <td>{p.prize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParticipantList;
