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
  _monthsEN = [
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

  _monthsHEB = [
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

  _monthDays: Array<any> = [];

  _currentMonthIndex: any;
  _currentDateStr: any;

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
    this._monthDays = [];
    this._date.setDate(1);

    await this.ordersService.getOrdersDates('/orders/getOrdersDates');

    // this.ordersService._datesArr.ordersCount.map((date: any) => {
    //   new Date().toISOString().split('T').shift() ===
    //   date.ShippingDate.split('T').shift()
    //     ? console.log('yes: ', date.ShippingDate.split('T').shift())
    //     : console.log('no: ', date.ShippingDate.split('T').shift());
    // });

    this.ordersService._datesArr.ordersCount.map((date: any) => {
      this.isShippingAvailable(date.ShippingDate)
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
    this._currentMonthIndex = this._date.getMonth();
    console.log('aa: ', this._currentMonthIndex);
    this._currentDateStr = new Date().toDateString();

    // print last month days
    for (let x = this.firstDayIndex; x > 0; x--) {
      // if this._currentMonthIndex=0 => january- last month needed to be 11=> december and not -1
      if (this._currentMonthIndex != 0) {
        this._monthDays.push({
          type: 0,
          num: this.prevLastDay - x + 1,
          monthIndex: this._currentMonthIndex - 1,
        });
      } else {
        this._monthDays.push({
          type: 0,
          num: this.prevLastDay - x + 1,
          monthIndex: 11,
        });
      }
    }

    // print current month days
    for (let i = 1; i <= this.lastDay; i++) {
      if (
        i === new Date().getDate() &&
        this._date.getMonth() === new Date().getMonth()
      ) {
        this._monthDays.push({
          type: 1,
          num: i,
          monthIndex: this._currentMonthIndex,
        });
      } else {
        this._monthDays.push({
          type: 3,
          num: i,
          monthIndex: this._currentMonthIndex,
        });
      }
    }

    // print next month days
    for (let j = 1; j <= this.nextDays; j++) {
      // if this._currentMonthIndex=11 => december- next month needed to be 0=> january and not 12
      if (this._currentMonthIndex != 11) {
        this._monthDays.push({
          type: 2,
          num: j,
          monthIndex: this._currentMonthIndex + 1,
        });
      } else {
        this._monthDays.push({
          type: 2,
          num: j,
          monthIndex: 0,
        });
      }
    }
    console.log('this._monthDays ARR: ', this._monthDays);
  }

  // isShippingAvailable(date.ShippingDate)
  isShippingAvailable(date: string) {
    if (
      new Date().toISOString().split('T').shift() === date.split('T').shift()
    ) {
      return true;
    } else {
      return false;
    }
  }

  prevIconClicked() {
    this._date.setMonth(this._date.getMonth() - 1);

    this.renderCalendar();
  }

  nextIconClicked() {
    this._date.setMonth(this._date.getMonth() + 1);
    console.log('nextIconClicked: ', this._date.getMonth() + 1);
    this.renderCalendar();
  }

  someDayClicked(dayOb: any) {
    console.log('some day clicked: ', dayOb);
  }

  backToTodayClicked() {
    this._date = new Date();
    console.log('backToTodayClicked : ', this._date);
    this.renderCalendar();
  }
}
