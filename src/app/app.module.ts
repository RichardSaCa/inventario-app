import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { FormsModule } from '@angular/forms';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';




@NgModule({
  declarations: [
    AppComponent,
    ProductoListaComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    MenuComponent,
    AgregarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule



  ],
  //interceptores para que se pueda aplicar globalmente
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
