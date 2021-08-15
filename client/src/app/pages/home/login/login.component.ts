import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public usersService: UsersServiceService) {}

  ngOnInit(): void {}
}
