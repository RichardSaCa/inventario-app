import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';

import * as $ from 'jquery'

import 'datatables.net';




@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent {
  productos: Producto[]; //importar la clase producto
  producto: Producto = new Producto();
  valor1: string = 'd';
 //dtoptions: DataTables.Settings = {};
  //dtTrigger: Subject<any>=new Subject<any>();
  constructor(private productoServicio: ProductoService, private enrutador: Router){}

  ngOnInit(){

    let api = $("#table1").DataTable();
    api.destroy();
    $("#click").on("click", function(){
      console.log("HELLO WORLDDD");
    })




     $(window).on("load", this.iniciar);
    //this.iniciar

    // $(document).ready(function () {

  // })

    //limpiar productos para crear uno nuevo
    this.producto = new Producto();


    // this.dtoptions.destroy;
    // this.dtoptions = {
    // stateSave: true,
    // ordering: true,
    // //  paging:false
    // // lengthChange:true,

    // language: {
    //   url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
    // },
    // lengthMenu: [
    //   [5, 10, 20, -1],
    //   [5, 10, 20, "TODO"],
    // ],
    // scrollY: "65vh", //65% de la pantalla se muestre la tabla
    // scrollCollapse: true,
    // paging: true,
    // // scrollX: true,
    // order: [[0, 'asc']],
    // columnDefs: [
    //   {targets: 0},{targets: 1},{targets: 2},{targets: 3},

    // ],
    // };

    //cargamos los productos
    this.obtenerProductos();



  }

iniciar(){

 let  table = $("#table1").DataTable({
  lengthMenu: [
    [5, 10, 20, -1],
    [5, 10,20, "TODO"],
  ],
  footerCallback: function ( row, data, start, end, display ) {
    let api = $("#table1").DataTable();
    let intVal = function (i: string | number): number {
      if (typeof i === 'string') {
        return Number(i.replace(/[\$,]/g, ''));
      } else if (typeof i === 'number') {
        return i;
      } else {
        return 0;
      }
  };

  var totalHab = api
      .column(2, {page: 'current'}) //solo la pagina actual de la columna 11
      .data()
      .reduce(function (a, b) {
          return intVal(a) + intVal(b);
      }, 0);

    // va.column(3).footer().innerHTML='hola';
    $(api.column(3).footer()).html(
      `precio total ${totalHab}`
    )
  }

 });

}

  private obtenerProductos(){
    //consumir datos del observalbe (suscribirnos)
    this.productoServicio.obtenerProductoLista().subscribe(
      (datos => {
        this.productos = datos;
        //this.dtTrigger.next(null);

      })
    )
  }

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id])
  }

  eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.irListaProductos(),
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
    //this.dtTrigger.unsubscribe();
    location.reload();
    this.enrutador.navigate(['/productos']);
    this.ngOnInit();
  }


}
