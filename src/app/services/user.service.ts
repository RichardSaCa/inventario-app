import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase = "http://localhost:8080/inventario-app/user";
  constructor(private clienteHttp: HttpClient, private tokenService: TokenService) { }

  //create user
  createUser(user: User): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, user,{ context: checkToken() });
  }
}
