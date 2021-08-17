import { Injectable } from '@angular/core';
import { User } from '../models/usersModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  _currentUser: Array<User> = [];
  _logInEmail: string = '';
  _logInPassword: string = '';
  _currentUserID?: number;
  _newUserObject: User = new User();
  _newID: any = null;

  _newPassword: string = '';
  _newPasswordRepeat: string = '';
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService
  ) {}

  // CREATE
  async addNewUserToDB(url: string, event?: any) {
    event.preventDefault();

    let newUserOBJ = {
      ID: this._newUserObject.ID,
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

    this._currentUser = (await this.apiService.createPostService(
      url,
      newUserOBJ
    )) as Array<User>;
    console.log('Current User: ', this._currentUser);

    this._currentUserID = this._currentUser[0].ID;
    console.log('current user ID: ', this._currentUserID);
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

    this._currentUserID = this._currentUser[0].ID;
    console.log('current user ID: ', this._currentUserID);
  }
  checkPassword = () => {
    if (this._newPassword !== this._newPasswordRepeat) alert('password');
  };
}
