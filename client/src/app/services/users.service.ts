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
// https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=5
// https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&q=jones
