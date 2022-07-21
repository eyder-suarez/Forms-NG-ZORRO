import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  myForms!: FormGroup

    /**
   * Una expresión regular que valida una dirección de correo electrónico.
   */
     public emailPattern  : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
     /**
      * Una expresión regular que valida un número.
      */
     public numberPattern : string = "^([0-9]+)$";
     /**
      * Una expresión regular que valida una cadena con un máximo de 15 caracteres.
      */
     public lettersPattern: string = "[a-zA-Z ]{0,15}";

  constructor(private fb: FormBuilder, private modal: NzModalService) { }

  ngOnInit(): void {

    this.myForms = this.fb.group({
      firstName      : ['', [Validators.required, Validators.pattern(this.lettersPattern)]],
      secondName     : ['', [Validators.required, Validators.pattern(this.lettersPattern)]],
      firstSurname   : ['', [Validators.required, Validators.pattern(this.lettersPattern)]],
      secondSurname  : ['', [Validators.required, Validators.pattern(this.lettersPattern)]],
      email          : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone          : ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      termsConditions: [ , [Validators.requiredTrue]]
    })

  }

  /**
   * Funcion para validar el campo de email
   */
  get emailErrors(): any {
    const errors = this.myForms.get('email')?.errors;
    if(errors?.["required"]){
      return 'Campo Obligatorio';
    }else if (errors?.["pattern"]) {
      return 'Ingrese un correo valido'
    }
  }


  /**
   * Función para validar todos los campos
   * @param field
   * @returns
   */
   invalidField( field: string ) {
    return this.myForms.get(field)?.invalid
            && this.myForms.get(field)?.touched;
  }

  /**
   * Modal de envio exitoso
   */
  success(): void {
    this.modal.success({
      nzTitle: 'Envio exitoso',
      nzContent: 'Solicitud enviada con exito'
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

  submit() {
    if(this.myForms.invalid) {
      this.error()
      this.myForms.markAllAsTouched()
    }else {
      this.success()
      this.myForms.reset()
    }
  }

}
