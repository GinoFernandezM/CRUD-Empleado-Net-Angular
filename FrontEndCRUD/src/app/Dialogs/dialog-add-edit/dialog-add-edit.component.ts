import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { Departamento } from 'src/app/Interfaces/departamento';
import { Empleado } from 'src/app/Interfaces/empleado';
import { DepartamentoService } from 'src/app/Services/departamento.service';
import { EmpleadoService } from 'src/app/Services/empleado.service';


export const MY_DATE_FORMATS  = {
  parse: {
    dateInput:'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMMYYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel: 'MMMMYYYY'
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent {
  formEmpleado: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion:string = 'Guardar';
  listaDepartamentos: Departamento[] = [];

  constructor (
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar : MatSnackBar,
    private _departamentoServicio: DepartamentoService,
    private _empleadoServicio: EmpleadoService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ) {

    this.formEmpleado = this.fb.group({
      nombreCompleto: ['',Validators.required],
      idDepartamento: ['',Validators.required],
      sueldo: ['',Validators.required],
      fechaContrato: ['',Validators.required],
    })

    this._departamentoServicio.getList().subscribe({
      next:(data) => {
        this.listaDepartamentos = data;
      },error:(e) => {}
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  addEditEmpleado(){
    console.log(this.formEmpleado.value)

    const modelo:Empleado = {
      idEmpleado:0,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      idDepartamento: this.formEmpleado.value.idDepartamento,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: moment(this.formEmpleado.value.fechaContrato).format('DD/MM/YYYY')
    }

    if(this.dataEmpleado == null){
      this._empleadoServicio.add(modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta('Empleado creado exitosamente', 'Ok');
          this.dialogoReferencia.close('creado');
        }, error:(e) => {
          this.mostrarAlerta('No se pudo crear empleado', 'Error');
        }
      })
    } else {
      this._empleadoServicio.update(this.dataEmpleado.idEmpleado, modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta('Empleado editado exitosamente', 'Ok');
          this.dialogoReferencia.close('editado');
        }, error:(e) => {
          this.mostrarAlerta('No se pudo editar empleado', 'Error');
        }
      })
    }


  }

  ngOnInit(): void {

    if(this.dataEmpleado){
      this.formEmpleado.patchValue({
        nombreCompleto: this.dataEmpleado.nombreCompleto,
        idDepartamento: this.dataEmpleado.idDepartamento,
        sueldo: this.dataEmpleado.sueldo,
        fechaContrato: moment(this.dataEmpleado.fechaContrato, 'DD/MM/YYYY')
      })

      this.tituloAccion = 'Editar'
      this.botonAccion = 'Actualizar'
    }
  }

}
