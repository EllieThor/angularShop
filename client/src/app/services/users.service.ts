import { Injectable } from '@angular/core';
import { User } from '../models/usersModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  // _currentUser: User = new User();
  _currentUser: Array<User> = [];
  _logInEmail: string = '';
  _logInPassword: string = '';
  _currentUserID: number = 0;

  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService
  ) {}

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

  addUserClicked = () => {};
}
