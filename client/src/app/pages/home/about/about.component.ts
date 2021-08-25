import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(
    public usersService: UsersServiceService,
    public cartService: CartsService
  ) {}

  ngOnInit(): void {}
}
