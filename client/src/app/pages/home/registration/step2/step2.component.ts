import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users.service';
import { City } from 'src/app/models/usersModel';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
})
export class Step2Component implements OnInit {
  cities: any = [];
  biggestCities: Array<City> = [];

  constructor(
    public usersService: UsersServiceService,
    public nav: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.httpClient.get('assets/israelCities.json').subscribe((data) => {
      this.cities = data;
      this.biggestCities = [...this.cities]
        .sort((a, b) => Number(b.population) - Number(a.population))
        .slice(0, 10);
      console.log('10 cities: ', this.biggestCities);
      // this.threeVacations = vacTest.sort((a, b) => b.follows.length - a.follows.length).slice(0, 3);
    });
  }
}
