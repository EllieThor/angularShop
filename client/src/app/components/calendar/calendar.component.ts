import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  _date: any = new Date();
  _months1 = [
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

  _months = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ];
  _currentMonth: any;
  _currentDateStr: any;
  _monthDays: any;

  lastDay: any;
  prevLastDay: any;
  firstDayIndex: any;
  lastDayIndex: any;
  nextDays: any;

  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService
  ) {
    this.renderCalendar();
  }

  ngOnInit(): void {}

  async renderCalendar() {
    this._date.setDate(1);

    await this.ordersService.getOrdersDates('/orders/getOrdersDates');

    this.ordersService._datesArr.ordersCount.map((date: any) => {
      new Date().toISOString().split('T').shift() ===
      date.ShippingDate.split('T').shift()
        ? console.log('yes: ', date.ShippingDate.split('T').shift())
        : console.log('no: ', date.ShippingDate.split('T').shift());
    });

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
