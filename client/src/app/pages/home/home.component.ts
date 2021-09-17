import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public usersService: UsersServiceService,
    public cartService: CartsService
  ) {}
  _user: any;
  ngOnInit(): void {
    this._user = localStorage.getItem('user');
    this._user = JSON.parse(this._user);
    console.log('this._user: ', this._user);
    if (this._user !== null) {
      this.usersService._currentUserObj = this._user;
      this.cartService.statusCartCheck('/carts/getCarts', {
        userID: this.usersService._currentUserObj.ID,
      });
    }
  }
}
