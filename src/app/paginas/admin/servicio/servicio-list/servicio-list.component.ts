import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/commons/models/servicio.model';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';

@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css']
})
export class ServicioListComponent implements OnInit {
  public listaServicios: Array<Servicio>;
  public loading = true;
  public servicioFilter = '';

  constructor(private servicioService: ServicioService, private router: Router, private alert: UtilAlertService) {}

  ngOnInit() {
    this.cargarData();
  }

  cargarData() {
    this.servicioService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        console.log(result.resultado);
        this.listaServicios = result.resultado;
      } else {
        this.alert.warningSwal(result.mensaje);
      }
    });
  }

  filtrarServicio(input: string) {
    console.log(input);
  }

  cambiarEstadoServicio(servicio: Servicio) {
    let accion = '';
    if (servicio.activo) {
      accion = 'Deshabilita';
    } else {
      accion = 'Habilita';
    }
    Swal.fire({
      title: '¿Seguro?',
      text: 'El servicio quedará ' + accion.toLowerCase() + 'do!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ' + accion + 'r!'
    }).then(result => {
      if (result.value) {
        servicio.activo = !servicio.activo;
        this.guardarServicio(servicio);
      }
    });
  }

  guardarServicio(servicio: Servicio) {
    this.servicioService.guardar(servicio).subscribe(result => {
      if (result.error) {
        if (!servicio.activo) {
          this.alert.errorSwal('Error al habilitar al servicio');
        } else {
          this.alert.errorSwal(result.mensaje);
        }
      }
    });
  }

  newServicio() {
    this.router.navigate(['/admin/servicio/new']);
  }

  openModal(servicio: Servicio) {
    console.log(servicio);
  }
}
