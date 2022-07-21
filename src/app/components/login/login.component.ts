import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email          : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password       : ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
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




}
