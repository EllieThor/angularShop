import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';
import { UsersServiceService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router,
    public usersService: UsersServiceService
  ) {}

  statusCartCheck() {}
}
