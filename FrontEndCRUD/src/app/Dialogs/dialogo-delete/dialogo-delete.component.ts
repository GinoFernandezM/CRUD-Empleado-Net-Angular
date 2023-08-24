import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from 'src/app/Interfaces/empleado';


@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent {
  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ){

  }

  ngOnInit():void{

  }

  confirmar_Eliminar(){
    if(this.dataEmpleado){
      this.dialogoReferencia.close('eliminar')
    }
  }

}
