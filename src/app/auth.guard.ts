import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    // Redirige al login si no hay token
    // Nota: Aquí usamos window.location.href porque no puedes usar el Router directamente
    window.location.href = '/login'; 
    return false;
  }

  // Si hay token, permite el acceso
  return true;
};
