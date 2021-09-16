import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  _date: any = new Date();
  _months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  _currentMonth: any;
  _currentDateStr: any;
  _monthDays: any;

  lastDay: any;
  prevLastDay: any;
  firstDayIndex: any;
  lastDayIndex: any;
  nextDays: any;
  constructor() {
    this.renderCalendar();
  }

  ngOnInit(): void {}

  renderCalendar() {
    this._date.setDate(1);

    this.lastDay = new Date(
      this._date.getFullYear(),
      this._date.getMonth() + 1,
      0
    ).getDate();

    this.prevLastDay = new Date(
      this._date.getFullYear(),
      this._date.getMonth(),
      0
    ).getDate();

    this.firstDayIndex = this._date.getDay();

    this.lastDayIndex = new Date(
      this._date.getFullYear(),
      this._date.getMonth() + 1,
      0
    ).getDay();

    this.nextDays = 7 - this.lastDayIndex - 1;

    this._currentMonth = this._months[this._date.getMonth()];
    this._currentDateStr = new Date().toDateString();

    let days = '';

    for (let x = this.firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${this.prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= this.lastDay; i++) {
      if (
        i === new Date().getDate() &&
        this._date.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }

    for (let j = 1; j <= this.nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
      this._monthDays = days;
    }

    console.log('lastDay:', this.lastDay);
    console.log('prevLastDay:', this.prevLastDay);
    console.log('firstDayIndex: ', this.firstDayIndex);
    console.log('lastDayIndex: ', this.lastDayIndex);
    console.log('nextDays: ', this.nextDays);
  }

  prevIconClicked() {
    this._date.setMonth(this._date.getMonth() - 1);
    this.renderCalendar();
  }
  nextIconClicked() {
    this._date.setMonth(this._date.getMonth() + 1);
    this.renderCalendar();
  }
}
