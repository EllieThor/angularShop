import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularMyDatePickerDirective,
  CalAnimation,
  IAngularMyDpOptions,
  IMyDateModel,
  IMyDefaultMonth,
} from 'angular-mydatepicker';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['./input-calendar.component.css'],
})
export class InputCalendarComponent implements OnInit {
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: 'su',
    markCurrentDay: true,
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    minYear: 1971,
    showSelectorArrow: true,
    monthSelector: true,
    yearSelector: false,
    satHighlight: true,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableWeekdays: ['sa'],
    disableDates: [],
    selectorHeight: '266px',
    selectorWidth: '266px',
    dateRangeDatesDelimiter: ' - ',
    showFooterToday: true,
    calendarAnimation: { in: CalAnimation.Fade, out: CalAnimation.Fade },
    rtl: true,
    stylesData: {
      selector: '',
      styles: '',
    },
  };

  @ViewChild('dp')
  ngxdp!: AngularMyDatePickerDirective;

  public selectedTextNormal: string = '';

  public disabled: boolean = false;
  public validDate: boolean = false;
  public inputText: string = '';

  public model: IMyDateModel = {
    isRange: false,
    singleDate: {},
  }; // not initial date set

  public defMonth: IMyDefaultMonth = {
    defMonth: '',
    overrideSelection: false,
  };

  public selectorSizes: Array<string> = new Array(
    '266px x 266px',
    '200px x 220px',
    '260px x 290px'
  );
  public defaultViews: Array<string> = new Array('date', 'month', 'year');
  public calAnimations: Array<string> = new Array(' Fade', 'None');
  public styleColor: Array<string> = new Array('Default', 'Grey', 'Blue');

  public locale: string = 'he';

  public locales: Array<string> = ['he | Hebrew', 'en | English'];

  constructor(public ordersService: OrdersService) {
    this.onDisableDay();
    this.onDisableUntilYesterday();
  }

  clearDate(): void {
    this.ordersService._newOrder.ShippingDate = '';
    this.ordersService._formattedShippingDate = '';
    this.ngxdp.clearDate();
  }

  setDate(): void {
    this.model = { isRange: false, singleDate: { jsDate: new Date() } };
  }

  onDisableUntilYesterday() {
    let copy = this.getCopyOfOptions();
    let d: Date = new Date();
    d.setDate(d.getDate() - 1);
    copy.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
    };

    this.myDatePickerOptions = copy;
  }

  async onDisableDay() {
    let disabled: any = [];
    this.ordersService._datesArr.map((date: any) => {
      !date.isAvailable ? disabled.push(date.ShippingObj) : null;
    });

    let copy = this.getCopyOfOptions();
    copy.disableDates = disabled;
    this.myDatePickerOptions = copy;
  }

  getCopyOfOptions(): IAngularMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }

  ngOnInit(): void {}

  // callbacks
  onDateChanged(event: IMyDateModel): void {
    if (!event.isRange) {
      let { jsDate, formatted }: any = event.singleDate;
      if (formatted !== '') {
        this.selectedTextNormal = formatted;
        this.validDate = true;
        this.inputText = formatted;

        this.ordersService._newOrder.ShippingDate = jsDate;
        this.ordersService._formattedShippingDate = formatted;
      } else {
        this.selectedTextNormal = '';
      }
    } else {
      let { formatted, jsDate }: any = event.dateRange;
      if (formatted !== '') {
        this.selectedTextNormal = formatted;
        this.ordersService._newOrder.ShippingDate = jsDate;
        this.ordersService._formattedShippingDate = formatted;
        this.validDate = true;
        this.inputText = formatted;
      } else {
        this.selectedTextNormal = '';
      }
    }
  }
}
