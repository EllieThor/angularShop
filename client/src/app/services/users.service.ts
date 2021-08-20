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
  _currentUser: Array<User> = [];
  _logInEmail: string = '';
  _logInPassword: string = '';

  _newUserObject: User = new User();
  _currentStep: number = 0;
  _newPassword: string = '';
  _newPasswordRepeat: string = '';

  result: any;
  _currentUserID?: number;
  _current_User: User = new User();
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router,
    public cartService: CartsService
  ) {}

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

    this.result = await this.apiService.createPostService(url, newUserOBJ);
    console.log('new User: ', this.result);

    let getByPatterns = {
      userEmail: this.result.Email,
      userPassword: this.result.Password,
    };

    this._currentUser = (await this.apiService.createPostService(
      '/users/getUser',
      getByPatterns
    )) as Array<User>;
    console.log('Current User: ', this._currentUser);
    if (this._currentUser.length > 0) {
      this._currentUserID = this._currentUser[0].ID;
      console.log('current user ID: ', this._currentUserID);
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

    this._currentUser = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<User>;
    console.log('Current User: ', this._currentUser);
    if (this._currentUser.length > 0) {
      this._currentUserID = this._currentUser[0].ID;
      console.log('current user ID: ', this._currentUserID);
      this._logInEmail = '';
      this._logInPassword = '';
    }
  }

  //READ
  async isIDExist(url: string, event?: any) {
    event.preventDefault();
    let getByPatterns = {
      ID: this._newUserObject.ID,
      Email: this._newUserObject.Email,
    };
    if (
      this._newUserObject.ID === 0 ||
      this._newUserObject.Email === '' ||
      this._newUserObject.Password === '' ||
      this._newPasswordRepeat === ''
    ) {
      alert('all felids must be felid');
    } else {
      this.result = await this.apiService.createPostService(url, getByPatterns);
      if (this.result.emailCount !== 0) {
        alert('email is already exist');
        this.nav.navigate(['/home']);
      } else if (this.result.IDCount !== 0) {
        alert('ID is already exist');
        this.nav.navigate(['/home']);
      } else {
        this._currentStep = 1;
      }
    }
  }

  checkPassword = () => {
    if (this._newPassword !== this._newPasswordRepeat)
      console.log('password not match');
  };
}
