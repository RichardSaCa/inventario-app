import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Route, Router } from '@angular/router';




@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent {
  productos: Producto[]; //importar la clase producto
  producto: Producto = new Producto();
  constructor(private productoServicio: ProductoService, private enrutador: Router){}

  ngOnInit(){

    //cargamos los productos
    this.obtenerProductos();


  }

  private obtenerProductos(){
    //consumir datos del observalbe (suscribirnos)
    this.productoServicio.obtenerProductoLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    )
  }

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id])
  }

  eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (err) => console.log(err)
      }
    )
  }

  descargarReporte(){
    this.productoServicio.descargarReporte().subscribe(
      (response =>{
        const blob = new Blob([response], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'richi.docx';
        a.click();
        window.URL.revokeObjectURL(url);
      })
    )
  }

  onSubmit(){
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
    this.obtenerProductos()
    //this.enrutador.navigate(['/productos']);
  }


}
