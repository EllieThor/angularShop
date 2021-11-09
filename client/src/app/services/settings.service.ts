import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  baseUrl: string = 'http://www.localhost:5001';
  herokuUrl: string = 'https://sweet-heart-online-grocery.herokuapp.com';
  uploadIMGUrl: string =
    'https://api.cloudinary.com/v1_1/dzxlvjeey/image/upload';
  hasLetters: any = /[a-zA-Zא-ת]/;
  hasLSymbol: any = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  hasLSymbolForEmail: any = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
  creditRegexp: any =
    /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  _isCartVisible = true;
  _screenSize: string = 'lg';
  constructor() {}
}
