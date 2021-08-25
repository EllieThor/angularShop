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

  ngOnInit(): void {}
}
