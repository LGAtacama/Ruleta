const ADMIN_PASSWORD = 'admin123'; // En un caso real, esto estaría en variables de entorno

export const checkAdminAuth = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const adminLogin = (password) => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const adminLogout = () => {
  localStorage.removeItem('isAdmin');
};
