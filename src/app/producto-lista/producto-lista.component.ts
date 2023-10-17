import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { setCookie } from 'typescript-cookie';
//import DataTable from 'datatables.net-dt';
//import 'datatables.net-select';

// import * as $ from 'jquery'
// import DataTable from 'datatables.net-dt';

//import 'datatables.net';
//import 'datatables.net-dt/css/jquery.dataTables.css';
//import 'datatables.net-select';




@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent {
  productos: Producto[]; //importar la clase producto
  productos2: Producto[];
  producto: Producto = new Producto();
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();
  parentSelector: boolean = false;
  boton_eliminar = {display: "none"};

  constructor(private productoServicio: ProductoService, private enrutador: Router){}

  ngAfterViewInit(){

    var api;
    // $(window).on("load", this.iniciar1);
    //  let api = $("#table1").DataTable();
    //  api.destroy();
    $("#click").on("click", function(){
      console.log("HELLO WORLDDD");
    })


    //  $(document).ready(function(){
      //this.iniciar();
    //  })
    //this.iniciar

    //limpiar productos para crear uno nuevo

    this.producto = new Producto();

    this.dtoptions.destroy;
    this.dtoptions = {
    stateSave: true,
    ordering: true,
    //  paging:false
    // lengthChange:true,

    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
    },
    // columnDefs: [
    //   {
    //     targets: [0], // Column index where you want the checkbox
    //     orderable: false, // Make the column not sortable
    //     className: 'select-checkbox', // Add a class to the column for styling
    //   },
    // ],



  //   'columnDefs': [
  //     {
  //         'targets': 0,
  //         'checkboxes': {
  //         'selectRow': true
  //         }
  //     }
  // ],

    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "TODO"],
    ],
    scrollY: "65vh", //65% de la pantalla se muestre la tabla
    scrollCollapse: true,
    paging: true,
    // scrollX: true,
    order: [[0, 'asc']],


    "drawCallback": function( settings ) {
      api = new $.fn.dataTable.Api( settings );

      // Output the data for the visible rows to the browser's console
      // You might do something more useful with it!
      console.log( api);
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
        .column(3, {page: 'current'}) //solo la pagina actual de la columna 11
        .data()
        .reduce(function (a, b) {
            return intVal(a) + intVal(b);
        }, 0);
      $(api.column(3).footer()).html(
            `precio total ${totalHab}`
           )

  },
    footerCallback: function ( row,settings, start, end, display ) {
      //let api = $("#table1").DataTable();
      let api = new $.fn.dataTable.Api(settings);
      let intVal = function (i: string | number): number {
        if (typeof i === 'string') {
          return Number(i.replace(/[\$,]/g, ''));
        } else if (typeof i === 'number') {
          return i;
        } else {
          return 0;
        }
     };

    console.log("DATOS: "+api);

    // var totalHab = api
    //     .column(3, {page: 'current'}) //solo la pagina actual de la columna 11
    //     .data()
    //     .reduce(function (a, b) {
    //         return intVal(a) + intVal(b);
    //     }, 0);

    //   // va.column(3).footer().innerHTML='hola';
    //   $(api.column(3).footer()).html(
    //     `precio total ${totalHab}`
    //   )
    }
    };
    //cargamos los productos
    this.obtenerProductos();
    //this.iniciar();

  }//FIN NGOINIT

checkbox(){
  for (const key of this.productos) {
    console.log(key);
  }
}

onChange($event: any){
  this.boton_eliminar = {"display": "none"};
  //fuente donde se tomo la informacion
  //https://www.youtube.com/watch?v=zL58GoOx_F8&t=334s
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  for (const key of this.productos) {
    if(key.idProducto == id){
      key.select = isChecked;
    }
    //console.log(key);
  }
  //console.log("ID: ",id," checked ",isChecked);
  if(id==-1){
    for (const key of this.productos) {
        key.select = isChecked;
      //console.log(key);
    }
  }

  for (const key of this.productos) {
    if(key.select == true){
      this.boton_eliminar = {"display": "block"};
      return;
    }
    //console.log(key);
  }

}



iniciar1(){
  this.dtoptions = {
    pagingType: 'full_numbers',
  }
}

iniciar(){
    let  table =  $("#table1").DataTable({
      stateSave: true,
      ordering: true,
      lengthMenu: [
        [5, 10, 20, -1],
        [5, 10,20, "TODO"],
      ],
      scrollY: "65vh", //65% de la pantalla se muestre la tabla
      scrollCollapse: true,
      paging: true,
      scrollX: true,
      //order: [[0, 'asc']],
      columnDefs: [
        {
            orderable: false,
            className: 'select-checkbox',
            targets: 0,
        }
      ],
      //select:true,

    order: [[1, 'asc']],
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
          .column(3, {page: 'current'}) //solo la pagina actual de la columna 11
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

obtenerProductos(){
  //consumir datos del observalbe (suscribirnos)
  this.productoServicio.obtenerProductoLista().subscribe(
    (datos => {
      datos.forEach(element => {
        element.select = false;
      });
      this.productos = datos;
      console.log("data ",datos[1])
      this.dtTrigger.next(null);
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

  eliminarProductos(){
   this.productos2 = [];
    for (const key of this.productos) {
      if(key.select == true){
        this.productos2.push(key);
      }
      //console.log(key);
    }
    this.productoServicio.eliminarProductos(this.productos2).subscribe(
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
    //this.ngOnInit();
  }






}
