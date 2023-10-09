import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  alert={
    "display": 'none',
  }

  message: string = '';

  formUser = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  user: User = new User();
  constructor(private userServicio: UserService, private enrutador: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.saveUser();
  }

  saveUser(){
    if(this.validarCampos()){
      this.userServicio.createUser(this.user).subscribe(
        {
          next: (data) => {
            this.irListaProducto();
          },
          error: (err: any) => {
            console.log(err);
          }
        },
      )
    }
  }

  irListaProducto(){
    this.enrutador.navigate(['/productos']);
  }


  validarCampos(): boolean{
    if(this.user.username == null){
      this.alert["display"]="block";
      this.message="Ingrese un usuario correcto"
      return false;
    }
    return true;
  }
}
