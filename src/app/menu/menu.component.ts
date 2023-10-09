import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: any;

  constructor(private enrutador: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.username= this.tokenService.getUsername();
  }

  logout(){
    this.tokenService.removeToken();
    this.tokenService.removeUsername();
    this.irLogin();
  }

  irLogin(){
    this.enrutador.navigate(['/']);
  }

}
