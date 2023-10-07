import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  CanActivate } from '@angular/router';
import { TokenService } from '../services/token.service';

//este guardian me permite verificar que si se inicio sesion
//se redirija automaticamentea a la pagina inicial

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (token) {
      this.router.navigate(['/productos']);
    }
    return true;
  }

}

