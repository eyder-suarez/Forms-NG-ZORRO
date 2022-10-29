import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


   /**
   * Una expresión regular que valida una dirección de correo electrónico.
   */
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    myForm!: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email          : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password       : ['', [Validators.required, Validators.minLength(8)]],
    })
  }


  /**
   * Funcion para validar el campo de email
   */
  get msgErrorEmail(): any {
    const errors = this.myForm.get('email')?.errors
    if (errors?.['required']) {
      return 'El campo es oblligatorio'
    } else if (errors?.['pattern']) {
      return 'Ingrese un correo valido'
    }
  }


  /**
   *
   * @param field campo que se validara si tiene errores en el formulario
   * @returns retorna las validaciones del campo en el formulario
   */
  fieldValidate(field: string) {
    return this.myForm.get(field)?.errors && this.myForm.get(field)?.touched
  }

   /**
   * Modal de envio exitoso
   */
    success(): void {
      this.modal.success({
        nzTitle: 'Inicio de sesion exitoso',
        nzContent: 'Da en aceptar para continuar'
      });
    }

    /**
     * Modal de envio fallido
     */
     error(): void {
      this.modal.error({
        nzTitle: 'Envio fallido',
        nzContent: 'Por favor llena los campos requeridos'
      });
    }

    /**
     * Funcion para enviar el formulario
     */
    submit() {
      if(this.myForm.invalid) {
        this.error()
        console.log(this.myForm.value);
        this.myForm.markAllAsTouched()
      }else {
        this.success()
        this.myForm.reset()
      }
    }


}
