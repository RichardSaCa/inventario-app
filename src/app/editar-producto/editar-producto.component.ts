import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = new Producto();
  id: number;
  //objeto de ruta para poder administrar el id recibido
  constructor(private productoServicio: ProductoService, private ruta: ActivatedRoute,
    private enrutador: Router) { }

  ngOnInit(): void {
    this.id = this.ruta.snapshot.params['id']; //obtener id de la url
    this.productoServicio.obtenerProductoPorId(this.id).subscribe(
      {
        next: (datos) => this.producto = datos,
        error: (err: any) => console.log(err)
      }
    )
  }

  onSubmit() {
    this.guardarProducto();
  }

  guardarProducto(){
    this.productoServicio.editarProducto(this.id, this.producto).subscribe(
      {
        next: (datos) => this.irProductoLista(),
        error: (err) => console.log(err)
      }
    );
  }

  irProductoLista(){
    this.enrutador.navigate(['/productos']);
  }

}
