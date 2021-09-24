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

  _weekDays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

  _monthDays: Array<any> = [];
  _monthDaysInWeeks: Array<any> = [];
  _currentMonthIndex: any;
  _currentDateStr: any;

  year: any;
  lastDay: any;
  prevLastDay: any;
  firstDayIndex: any;
  lastDayIndex: any;
  nextDays: any;

  _el: any;

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
    this._currentDateStr = new Date().toDateString();
    this.year = this._date.getFullYear();

    // print last month days
    for (let x = this.firstDayIndex; x > 0; x--) {
      // if this._currentMonthIndex=0 => january- last month needed to be 11=> december and not -1

      this._monthDays.push({
        type: 0,
        num: this.prevLastDay - x + 1,
        monthIndex:
          this._currentMonthIndex != 0 ? this._currentMonthIndex - 1 : 11,
        year: this._currentMonthIndex != 0 ? this.year : this.year - 1,
        availability: this.isShippingAvailable(
          this._currentMonthIndex,
          this.prevLastDay - x + 1
        ),
      });
    }

    // print current month days
    for (let i = 1; i <= this.lastDay; i++) {
      this._monthDays.push({
        type:
          i === new Date().getDate() &&
          this._date.getMonth() === new Date().getMonth()
            ? 1
            : 3,
        num: i,
        monthIndex: this._currentMonthIndex,
        year: this.year,
        availability: this.isShippingAvailable(this._currentMonthIndex + 1, i),
      });
    }

    // print next month days
    for (let j = 1; j <= this.nextDays; j++) {
      // if this._currentMonthIndex=11 => december- next month needed to be 0=> january and not 12

      this._monthDays.push({
        type: 2,
        num: j,
        monthIndex:
          this._currentMonthIndex != 11 ? this._currentMonthIndex + 1 : 0,
        year: this._currentMonthIndex != 11 ? this.year : this.year + 1,
        availability: this.isShippingAvailable(this._currentMonthIndex + 1, j),
      });
    }
    console.log('this._monthDays ARR: ', this._monthDays);
    this._monthDaysInWeeks = this.sliceIntoWeeks(this._monthDays, 7);
  }

  prevIconClicked() {
    this._date.setMonth(this._date.getMonth() - 1);
    this.renderCalendar();
  }

  nextIconClicked() {
    this._date.setMonth(this._date.getMonth() + 1);
    this.renderCalendar();
  }

  backToTodayClicked() {
    this._date = new Date();
    this.renderCalendar();
  }

  someDayClicked(dayOb: any, e: any) {
    console.log('today finally: ', e.target);
    if (this._el) {
      this._el.classList.remove('bg-success');
      console.log('today finally: ', this._el);
      this.ordersService._newOrder.ShippingDate = '';
    }
    //FIXME:   אי אפשר יהיה להזמין משלוח לתאריך שעבר
    // let todayNum: any = new Date().getDate();
    // let todayMonthIndex: any = new Date().getMonth() + 1;
    // let todayYear: any = new Date().getFullYear();

    // console.log('today finally: ', todayNum, todayMonthIndex, todayYear);

    // console.log('today finally real: ', new Date());
    //  dayOb.year >= todayYear &&
    //    dayOb.monthIndex >= todayMonthIndex &&
    //    dayOb.num >= todayNum;
    // availability is false if there is more then 2 deliveries for this day
    if (dayOb.availability) {
      const d = new Date(dayOb.year, dayOb.monthIndex, dayOb.num, 13, 30);
      console.log('some day clicked: availability true ', dayOb);
      this.ordersService._newOrder.ShippingDate = d.toISOString();
      this._el = e.target;
      this._el.className = 'bg-success';
    }
  }

  isShippingAvailable(monthIndex: any, dayNum: any) {
    // d.ShippingDate.split('T').shift().split('-')  =>  ['2021', '09', '19']
    // this._currentDateStr.split(' ')  =>  ['Sun', 'Sep', '19', '2021']

    let shippingNum = this.ordersService._datesArr.ordersCount.filter(
      (d: any) =>
        d.ShippingDate.split('T').shift().split('-')[0] ==
          this._currentDateStr.split(' ')[3] &&
        d.ShippingDate.split('T').shift().split('-')[1] == monthIndex &&
        d.ShippingDate.split('T').shift().split('-')[2] == dayNum
    );
    return shippingNum.length > 2 ? false : true;
  }

  sliceIntoWeeks(arr: any, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }
}
