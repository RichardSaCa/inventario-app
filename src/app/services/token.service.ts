import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    //expira en un año, / habil para todas las rutas de la app
    setCookie('token-api', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token-api');
    return token;
  }

  removeToken() {
    removeCookie('token-api');
  }
}
