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
  // _user: any;
  ngOnInit(): void {
    // this._user = localStorage.getItem('user');
    // this._user = JSON.parse(this._user);
    // this.usersService.localStorageUser = {
    //   user: this._user,
    // };
    // console.log(
    //   'user from local storage : ',
    //   this.usersService.localStorageUser
    // );
    // this.usersService._currentUser[0] = this.usersService.localStorageUser;
    // console.log(
    //   'current user from local : ',
    //   this.usersService._currentUser[0]
    // );
  }
}
