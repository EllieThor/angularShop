import { Injectable } from '@angular/core';
import { User } from '../models/usersModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  // _currentUser: Array<User> = [];
  _currentUser: User = new User();
  _logInEmail: string = '';
  _logInPassword: string = '';
  _currentUserId: number = 0;
  logInFormStatus: boolean = false;
  logOutFormStatus: boolean = false;
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService
  ) {}

  async gatUserFromDB(url: string, ob?: any) {
    let getByPatterns = {
      userEmail: this._logInEmail,
      userPassword: this._logInPassword,
    };

    this._currentUser = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as User;
    console.log('Current User: ', this._currentUser);
    this.logInFormStatus = false;
    this._currentUserId = this._currentUser.ID;
    console.log('UserID: ${this._userId} more text', this._currentUserId);
  }

  addUserClicked = () => {};
}
