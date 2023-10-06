import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  producto: Producto = new Producto();
  constructor(private productoServicio: ProductoService, private enrutador: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.guardarProducto();
  }

  guardarProducto(){
    this.productoServicio.agregarProducto(this.producto).subscribe(
      {
        next: (datos) =>{
          this.irListaProductos();
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    );
  }

  irListaProductos(){
    this.enrutador.navigate(['/productos']);
  }

}
