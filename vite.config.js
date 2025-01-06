// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reemplaza '/Ruleta/' con el nombre de tu repositorio si es diferente
export default defineConfig({
  plugins: [react()],
  base: '/Ruleta/', // Asegúrate de que esta ruta coincida con tu repositorio
});
