import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/usersModel';
import { ApiService } from './api.service';
import { CartsService } from './carts.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  _currentUserObj: User = new User();
  // login
  _logInEmail: string = '';
  _logInPassword: string = '';

  // registration
  _newUserObject: User = new User();
  _currentStep: number = 0;
  _newUserIDStr: string = '';
  // registration password
  _newPasswordRepeat: string = '';

  serverResult: any;

  localStorageUser: any = {};
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router,
    public cartService: CartsService
  ) {}

  // registration step 1
  async isIDExist(url: string, event?: any) {
    event.preventDefault();
    let getByPatterns = {
      ID: this._newUserIDStr,
      Email: this._newUserObject.Email,
    };

    if (this._newUserIDStr.length !== 9) {
      alert('יש למלא מספר תעודת זהות תקין- 9 ספרות');
    } else if (this.settingsService.hasLetters.test(this._newUserIDStr)) {
      alert('יש למלא מספר תעודת זהות תקין- ספרות בלבד ללא אותיות');
    } else if (this.settingsService.hasLSymbol.test(this._newUserIDStr)) {
      alert('יש למלא מספר תעודת זהות תקין- ספרות בלבד ללא סימנים מיוחדים');
    } else if (this._newUserObject.Email === '') {
      alert('יש למלא כתובת מייל ');
    } else if (
      this.settingsService.hasLSymbolForEmail.test(this._newUserObject.Email)
    ) {
      alert('יש למלא כתובת מייל-ללא סימנים מיוחדים');
    } else if (this._newUserObject.Email === '') {
      alert('יש למלא כתובת מייל חוקית');
    } else if (!this._newUserObject.Email.includes('@')) {
      alert(' @ - יש למלא כתובת מייל חוקית חסר');
    } else if (!this._newUserObject.Email.includes('.')) {
      alert('. - יש למלא כתובת מייל חוקית : חסרה נקודה');
    } else if (
      this._newUserObject.Email === '.@' ||
      this._newUserObject.Email === '@.'
    ) {
      alert('יש למלא כתובת מייל מלאה חוץ מנקודה ושטרודל');
    } else if (this._newUserObject.Password.length < 6) {
      alert('יש למלא סיסמה, לפחות 6 אותיות/ספרות');
    } else if (this._newUserObject.Password !== this._newPasswordRepeat) {
      alert('סיסמה לא תואמת');
    } else {
      this.serverResult = await this.apiService.createPostService(
        url,
        getByPatterns
      );
      if (this.serverResult.emailCount !== 0) {
        alert('כתובת מייל קיימת, יש להתחבר');
        this.nav.navigate(['/home']);
      } else if (this.serverResult.IDCount !== 0) {
        alert('תעודת זהות קיימת במערכת, יש להתחבר');
        this.nav.navigate(['/home']);
      } else {
        this._currentStep = 1;
      }
    }
  }

  // registration step 2

  // CREATE
  async addNewUserToDB(url: string, event?: any) {
    event.preventDefault();

    let newUserOBJ = {
      ID: Number(this._newUserIDStr),
      FirstName: this._newUserObject.FirstName,
      LastName: this._newUserObject.LastName,
      Email: this._newUserObject.Email,
      Password: this._newUserObject.Password,
      Phone: this._newUserObject.Phone,
      Street: this._newUserObject.Street,
      StreetNumber: this._newUserObject.StreetNumber,
      FlatNumber: this._newUserObject.FlatNumber,
      City: this._newUserObject.City,
    };
    if (this._newUserObject.FirstName === '') {
      alert('יש למלא שם פרטי');
    } else if (this._newUserObject.LastName === '') {
      alert('יש למלא שם משפחה');
    } else if (this._newUserObject.Phone === 0) {
      alert('יש למלא מספר טלפון ');
    } else if (this._newUserObject.Street === '') {
      alert('יש למלא שם רחוב-ללא מספר');
    } else if (this._newUserObject.StreetNumber === 0) {
      alert('יש למלא מספר בניין');
    } else if (this._newUserObject.FlatNumber === 0) {
      alert('יש למלא שם דירה');
    } else if (this._newUserObject.City === '') {
      alert('יש למלא עיר');
    } else {
      this.serverResult = await this.apiService.createPostService(
        url,
        newUserOBJ
      );

      this._logInEmail = this.serverResult.Email;
      this._logInPassword = this.serverResult.Password;
      await this.gatUserFromDB('/users/getUser');

      this._logInEmail = '';
      this._logInPassword = '';
      this._newPasswordRepeat = '';
      this._currentStep = 0;
      this._newUserIDStr = '';
      this._newUserObject = new User();
    }
  }

  // READ
  async gatUserFromDB(url: string, event?: any) {
    let getByPatterns = {
      userEmail: this._logInEmail,
      userPassword: this._logInPassword,
    };

    this.serverResult = await this.apiService.createPostService(
      url,
      getByPatterns
    );

    this._currentUserObj = this.serverResult[0];

    if (this._currentUserObj.Role === 1) {
      this.nav.navigate(['/shop']);
    } else if (this._currentUserObj.ID) {
      this._logInEmail = '';
      this._logInPassword = '';
      let getByPatterns = {
        userID: this._currentUserObj.ID,
      };
      this.cartService.statusCartCheck('/carts/getCarts', getByPatterns);
      if (!this.localStorageUser.user) {
        localStorage.setItem('user', JSON.stringify(this._currentUserObj));
      }
      this.nav.navigate(['/home']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this._currentUserObj = new User();
    this.nav.navigate(['/home']);
  }
}
