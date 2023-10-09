import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';


const routes: Routes = [
  //ruta por defaul
  {path: 'login',
  canActivate: [ RedirectGuard ],
  component: LoginComponent},
  {path: 'productos',
  //implementamos el guardian con canActivate
  canActivate: [ AuthGuard],
  component: ProductoListaComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'agregar-producto',canActivate: [ AuthGuard], component: AgregarProductoComponent},
  {path: 'agregar-usuario',canActivate: [ AuthGuard], component: AgregarUsuarioComponent},
  {path: 'editar-producto/:id',canActivate: [ AuthGuard], component: EditarProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
