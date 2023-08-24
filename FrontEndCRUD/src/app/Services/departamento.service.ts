import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { Departamento  } from '../Interfaces/departamento'

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private endpoint: string = environment.endPoint;
  private apirUrl:string = this.endpoint + "departamento/";

  constructor(private http:HttpClient) {}

  getList():Observable<Departamento[]>{
      return this.http.get<Departamento[]>(`${this.apirUrl}lista`);
  }
}

