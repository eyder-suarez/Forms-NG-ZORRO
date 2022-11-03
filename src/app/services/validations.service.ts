import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

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

}
