import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable, tap } from 'rxjs';
import { ResponseLogin } from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlBase = "http://localhost:8080/api/auth/login";
  constructor(private clienteHttp: HttpClient, private tokenService: TokenService) { }

  iniciarSesion(login: Login):  Observable<Object>{
    return this.clienteHttp.post<ResponseLogin>(this.urlBase, login)
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveUsername(response.username);
        //console.log("refresh token: ",response.access_token);
      })
    );;
  }
}
