import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl<any, any>):Observable<ValidationErrors | null> {

    const email = control.value
    console.log(email);
    return this.http.get<any[]>(`http://localhost:3000/usuarios?=${email}`)
      .pipe(
        map(resp => {
          return (resp.length === 0)? null : {emailTomado: true}
        })
      )
  }




}
