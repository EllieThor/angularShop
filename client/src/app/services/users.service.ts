import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/usersModel';
import { ApiService } from './api.service';
import { CartsService } from './carts.service';
import { OrdersService } from './orders.service';
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
    let hasLetters = /[a-zA-Z]/;
    let hasLSymbol = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    console.log('hasLetters: ', hasLetters.test(this._newUserIDStr));
    console.log('hasLSymbol: ', hasLSymbol.test(this._newUserIDStr));

    if (this._newUserIDStr.length !== 9) {
      alert('יש להכניס מספר תעודת זהות תקין- 9 ספרות');
    } else if (hasLetters.test(this._newUserIDStr)) {
      alert('יש להכניס מספר תעודת זהות תקין- ספרות בלבד ללא אותיות');
    } else if (hasLSymbol.test(this._newUserIDStr)) {
      alert('יש להכניס מספר תעודת זהות תקין- ספרות בלבד ללא סימנים מיוחדים');
    } else if (
      this._newUserObject.Email === '' ||
      !this._newUserObject.Email.includes('@' && '.')
    ) {
      alert('יש להכניס כתובת מייל חוקית');
    } else if (this._newUserObject.Password.length < 6) {
      alert('יש להכניס סיסמה, לפחות 6 אותיות/ספרות');
    } else if (this._newUserObject.Password !== this._newPasswordRepeat) {
      alert('סיסמה לא תואמת');
    } else {
      this.serverResult = await this.apiService.createPostService(
        url,
        getByPatterns
      );
      if (this.serverResult.emailCount !== 0) {
        alert('email is already exist');
        this.nav.navigate(['/home']);
      } else if (this.serverResult.IDCount !== 0) {
        alert('ID is already exist');
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
      ID: Number(this._newUserObject.ID),
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

    this.serverResult = await this.apiService.createPostService(
      url,
      newUserOBJ
    );
    console.log('new User: ', this.serverResult);

    let getByPatterns = {
      userEmail: this.serverResult.Email,
      userPassword: this.serverResult.Password,
    };

    this.serverResult = await this.apiService.createPostService(
      '/users/getUser',
      getByPatterns
    );

    console.log('this.serverResult : ', this.serverResult);
    if (this._currentUserObj.ID) {
      this._logInEmail = '';
      this._logInPassword = '';
      this.nav.navigate(['/home']);
    }
  }

  // READ
  async gatUserFromDB(url: string, event?: any) {
    event.preventDefault();
    let getByPatterns = {
      userEmail: this._logInEmail,
      userPassword: this._logInPassword,
    };

    this.serverResult = await this.apiService.createPostService(
      url,
      getByPatterns
    );

    this._currentUserObj = this.serverResult[0];
    console.log('this._currentUserObj: ', this._currentUserObj);

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
        console.log('after set : ', localStorage.getItem('user'));
      }
    }
  }

  logout() {
    localStorage.removeItem('user');
    this._currentUserObj = new User();
    this.nav.navigate(['/home']);
  }
}
