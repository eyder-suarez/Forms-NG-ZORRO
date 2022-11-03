import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { Cities } from 'src/app/interfaces/city.interfaces';

//Services
import { DataService } from 'src/app/services/data.service';
import { ValidationsService } from 'src/app/services/validations.service';

//Imports Ng-Zorro
import { getISOWeek } from 'date-fns';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  myForms!: FormGroup

  public listCities: any
  public passwordVisible = false;
  public password?: string;
  public inputValue?: string;
  public options: string[] = [];


  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private dataServices: DataService,
    private validations: ValidationsService
    ) { }

  ngOnInit(): void {

      this.dataServices.getCities().subscribe((resp) => {
        this.listCities = resp
      })


    this.myForms = this.fb.group({
      typeDocument   : ['', []],
      numberDocument : ['', [Validators.required, Validators.pattern(this.validations.numberPattern)]],
      firstName      : ['', [Validators.required, Validators.pattern(this.validations.lettersPattern)]],
      secondName     : ['', [Validators.required, Validators.pattern(this.validations.lettersPattern)]],
      firstSurname   : ['', [Validators.required, Validators.pattern(this.validations.lettersPattern)]],
      secondSurname  : ['', [Validators.required, Validators.pattern(this.validations.lettersPattern)]],
      birthDate      : ['', []],
      city           : ['', [Validators.required, Validators.pattern(this.validations.lettersPattern)]],
      email          : ['', [Validators.required, Validators.pattern(this.validations.emailPattern)]],
      password       : ['', [Validators.required]],
      phone          : ['', [Validators.required, Validators.pattern(this.validations.numberPattern)]],
      termsConditions: [ ,  [Validators.requiredTrue]]

    })

  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? this.listCities : [];
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
