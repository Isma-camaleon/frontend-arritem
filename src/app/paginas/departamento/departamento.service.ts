import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';
import { Departamento } from 'src/app/commons/models/departamento.model';
import { map } from 'rxjs/operators';
import { DetalleDeptoInventario } from 'src/app/commons/models/detalle_depto_inventario.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private urlBase = `${environment.backend_url}api/departamento`;
  constructor(private http: HttpClient) {}

  public listado(): Observable<ResultadoProc<Array<Departamento>>> {
    return this.http.get<ResultadoProc<Array<Departamento>>>(`${this.urlBase}/all`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public listWithSearchAndPagination(
    departamento: Departamento,
    page: number,
    pageSize: number
  ): Observable<ResultadoProc<IPaginacion<Departamento>>> {
    const params: HttpParams = new HttpParams().set('direccion', departamento.direccion);
    return this.http
      .get<ResultadoProc<IPaginacion<Departamento>>>(
        `${this.urlBase}/list/page/${page}/${pageSize}`,
        { params }
      )
      .pipe(
        map(result => {
          console.clear();
          console.table(result.resultado.content);
          return result;
        })
      );
  }

  public getById(id: number): Observable<ResultadoProc<Departamento>> {
    return this.http.get<ResultadoProc<Departamento>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardarInventario(detalle: DetalleDeptoInventario): Observable<ResultadoProc<DetalleDeptoInventario>> {
    
    if (detalle.id > 0) {
      return this.http.put<ResultadoProc<DetalleDeptoInventario>>(`${this.urlBase}/inventario`, detalle);
    } else {
      return this.http.post<ResultadoProc<DetalleDeptoInventario>>(`${this.urlBase}/inventario`, detalle);
    }
  }

  public guardar(departamento: Departamento): Observable<ResultadoProc<Departamento>> {
    if (departamento.id > 0) {
      return this.http.put<ResultadoProc<Departamento>>(this.urlBase, departamento);
    } else {
      departamento.activo = true;
      return this.http.post<ResultadoProc<Departamento>>(this.urlBase, departamento);
    }
  }
}
