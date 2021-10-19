import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
})
export class Step2Component implements OnInit {
  cities: any = [];

  constructor(
    public usersService: UsersServiceService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.httpClient.get('assets/israelCities.json').subscribe((data) => {
      this.cities = data;
    });
  }
}
