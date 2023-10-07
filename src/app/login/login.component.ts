import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(private loginServicio: LoginService, private enrutador: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loginServicio.iniciarSesion(this.login).subscribe(
      {
        next: (datos) =>{
          this.irListaProductos();
          console.log("Inicio autorizado ",datos);
        },
        error:(err: any) => {
          console.log("Erro encontrado: ",err)
        }
      }
    )
  }

  irListaProductos(){
    this.enrutador.navigate(['/productos']);
  }

}
