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

  _monthDays: Array<any> = []; // DELETE: s
  _currentMonthStr: any;
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

    this._currentMonthStr = this._monthsHEB[this._date.getMonth()];
    this._currentDateStr = new Date().toDateString();

    for (let x = this.firstDayIndex; x > 0; x--) {
      this._monthDays.push({ type: 0, num: this.prevLastDay - x + 1 });
    }

    for (let i = 1; i <= this.lastDay; i++) {
      if (
        i === new Date().getDate() &&
        this._date.getMonth() === new Date().getMonth()
      ) {
        this._monthDays.push({ type: 1, num: i });
      } else {
        this._monthDays.push({ type: 3, num: i });
      }
    }

    for (let j = 1; j <= this.nextDays; j++) {
      this._monthDays.push({ type: 2, num: j });
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
    this.renderCalendar();
  }

  someDayClicked(dayOb: any) {
    console.log('some day clicked: ', dayOb);
  }
}
