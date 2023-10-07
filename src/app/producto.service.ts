import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto';
//permite administrar el token
import { TokenService } from './services/token.service';
import { checkToken } from './interceptors/token.interceptor';

@Injectable({ //para utlizarlo en otro componente
  providedIn: 'root'
})

export class ProductoService {
  private urlBase = "http://localhost:8080/inventario-app/productos";
  //ejemplo de prueba para token:
  //private token = "iyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6Imh0dHA6Ly9pbnZlbnRhcmlvL2VqZW1wbG8iLCJpYXQiOjE2OTY2MDg4NDQsImV4cCI6MTY5NzkwNDg0NH0.xAtGeTc52m4AnwQszdUfUcjbdvpwB3js6BOY_vlrkJc";
  constructor(private clienteHttp: HttpClient, private tokenService: TokenService) { }



  obtenerProductoLista(): Observable<Producto[]>{
    //console.log(this.tokenService.getToken());
    // return this.clienteHttp.get<Producto[]>(this.urlBase,{
    //   headers: {
    //     Authorization: `Bearer ${this.tokenService.getToken()}`
    // }});

    return this.clienteHttp.get<Producto[]>(this.urlBase,{ context: checkToken() });
  }

  agregarProducto(producto: Producto): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, producto,{ context: checkToken() });
  }

  obtenerProductoPorId(id: number){
    return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`,{ context: checkToken() });
  }

  editarProducto(id: number, producto: Producto): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, producto,{ context: checkToken() });
  }

  eliminarProducto(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`,{ context: checkToken() });
  }
}
