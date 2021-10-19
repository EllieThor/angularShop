import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(public usersService: UsersServiceService) {}

  ngOnInit(): void {}
}
