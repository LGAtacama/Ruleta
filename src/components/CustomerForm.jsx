import React, { useState } from 'react';
import './CustomerForm.css';

function CustomerForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ticketNumber: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.ticketNumber.trim()) {
      newErrors.ticketNumber = 'El número de boleta es requerido';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="customer-form-container">
      <div className="form-header">
        <div className="form-title">
          <h2>¡Participa y Gana!</h2>
          <p>Ingresa tus datos para girar la ruleta</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="customer-form">
        <div className={`form-group required ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor="name">
            <i className="fas fa-user"></i>
            Nombre y Apellido
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className={`form-group required ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className={`form-group required ${errors.ticketNumber ? 'has-error' : ''}`}>
          <label htmlFor="ticketNumber">
            <i className="fas fa-ticket-alt"></i>
            N° Boleta
          </label>
          <input
            type="text"
            id="ticketNumber"
            name="ticketNumber"
            value={formData.ticketNumber}
            onChange={handleChange}
            placeholder="Ingresa el número de tu boleta"
            className={errors.ticketNumber ? 'error' : ''}
          />
          {errors.ticketNumber && <span className="error-message">{errors.ticketNumber}</span>}
        </div>

        <button type="submit" className="submit-button">
          Comenzar a Jugar
        </button>
      </form>

      <div className="form-footer">
        <p>¡Gana increíbles descuentos y premios!</p>
      </div>
    </div>
  );
}

export default CustomerForm;
