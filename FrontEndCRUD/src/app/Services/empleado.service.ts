import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { Empleado } from '../Interfaces/empleado';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private endpoint: string = environment.endPoint;
  private apirUrl:string = this.endpoint + "empleado/";

  constructor(private http:HttpClient) {}

  getList():Observable<Empleado[]>{
      return this.http.get<Empleado[]>(`${this.apirUrl}lista`);
  }

  add(modelo: Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(`${this.apirUrl}guardar`, modelo);
  }

  update(idEmpleado: number, modelo: Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(`${this.apirUrl}actualizar/${idEmpleado}`, modelo);
  }

  delete(idEmpleado: number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}eliminar/${idEmpleado}`);
  }

}
