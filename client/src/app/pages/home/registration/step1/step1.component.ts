import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
})
export class Step1Component implements OnInit {
  constructor(public usersService: UsersServiceService) {}

  ngOnInit(): void {}
}
