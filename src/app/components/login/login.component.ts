import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Una expresión regular que valida una dirección de correo electrónico.
   */
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalService, private auth: AuthService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email          : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password       : ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,  Validators.minLength(8)]]
    }, {
      validators: [this.fieldsEqual('password', 'confirmPassword')] //Opciones para validar todo el formulario
    })
  }


  /**
   * Funcion para validar la contraseña que sean iguales los dos campos
   * @param field1 Campo de la contraseña
   * @param field2 Campo para confirmar la contraseña
   * @returns Devuelve verdadero si los campos son iguales
   */
  fieldsEqual(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;
      if(pass1 !== pass2) {
        formGroup.get(field2)?.setErrors({noEquals: true})
        return {noEquals: true}
      }
      formGroup.get(field2)?.setErrors(null)
      return null
    }
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
        nzTitle: 'Registro exitoso',
        nzContent: 'Revisa tu correo y sigue las instruciones para continuar'
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
