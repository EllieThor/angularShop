import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css'],
})
export class GeneralInfoComponent implements OnInit {
  constructor(
    public usersService: UsersServiceService,
    public cartService: CartsService
  ) {}

  ngOnInit(): void {}
}
