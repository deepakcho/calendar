import { Component, Input, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calender',
  templateUrl: './app.calendar.html',
  styleUrls: ['./app.calendar.css']
})
export class AppCalendarComponent implements DoCheck {
  public title: any = {
    month: this.getMonthLiteral(new Date()),
    year: new Date().getFullYear()
  };
  public days: Array<Object>;

  public selectedMonth = 0;
  public selectedYear = 0;
  public selectedDate: Date;
  public state: string;
  public daysArray: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public holidayList: any;
  constructor(private http: HttpClient) {
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
    this.days = this.createDayEvents(this.selectedMonth, this.selectedYear);
    this.http.get('assets/holidays.json').subscribe((res: any) => {
      console.log(res);
      this.holidayList = res;
    });
  }

  public findStartDateIndex(year: number, month: number) {
    const startIndex: string = new Date(year, month).toString();
    return this.daysArray.findIndex((dt: any) => {
      if (startIndex.indexOf(dt) === 0) {
        return dt;
      }
    });
  }
  public ngDoCheck() {
    //
    if (this.holidayList) {
      this.holidayList.holidays.map((hd: any) => {
        this.days.map((dt: any) => {
          dt.map((dt1: any) => {
            if (this.isSameDay(hd.date, dt1.fullDate)) {
               dt1.holidayEvent = hd;
               console.log('hi');
            }
          });
        });
      });
    }
  }

  public createDayEvents(month: number, year: number) {
    const dt1 = this.findStartDateIndex(year, month);
    let dtCounter: number = -1;
    let temp: number = -1;
    let temp2: number = -1;
    const array = new Array(42).fill('').map((dt: any, i: number) => {
      if (dt1 <= i && dt1 + this.daysInMonth(year, month) > i) {
        dtCounter++;
        const date = new Date(
          year,
          month,
          new Date(year, month).getDate() + dtCounter
        );
        const currentDate = this.isCurrentDay(date);
        return {
          date: date.getDate(),
          fullDate: date,
          inMonth: true,
          currentDate: currentDate,
          isWeekEnd: this.isWeekEnd(date)
        };
      }
      if (i >= dt1 + this.daysInMonth(year, month)) {
        temp++;
        const date = new Date(
          year,
          month + 1,
          new Date(year, month).getDate() + temp
        );
        const currentDate = this.isCurrentDay(date);

        return {
          date: date.getDate(),
          fullDate: date,
          inMonth: false,
          currentDate: currentDate,
          isWeekEnd: this.isWeekEnd(date)
        };
      } else {
        temp2++;

        const date = new Date(
          year,
          month,
          new Date(year, month).getDate() - dt1 + temp2
        );
        const currentDate = this.isCurrentDay(date);
        return {
          date: date.getDate(),
          inMonth: false,
          currentDate: currentDate,
          fullDate: date,
          isWeekEnd: this.isWeekEnd(date)
        };
      }
    });
    return this.chunk(array);
  }

  public chunk(array: Array<object>) {
    const chunk = [];
    while (array.length > 0) {
      chunk.push(array.splice(0, 7));
    }
    return chunk;
  }

  public handler(ev: any) {
    alert(JSON.stringify(ev));
  }

  public isWeekEnd(date: Date) {
    return date.getDay() === 6 || date.getDay() === 0;
  }

  public isCurrentDay(date: Date) {
    return date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
  }


  public isSameDay(date1: Date, date2: Date) {
    return new Date(date1).setHours(0, 0, 0, 0) ===
    new Date(date2).setHours(0, 0, 0, 0);
  }

  public daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  public getMonthLiteral(date: Date) {
    const objDate = date,
      locale = 'en-us',
      month = objDate.toLocaleString(locale, { month: 'long' });
    return month;
  }
  public next() {
    ++this.selectedMonth;
    this.setDate();
    this.state = 'next';
    setTimeout(() => {
      this.state = '';
    }, 200);
  }

  public prev() {
    --this.selectedMonth;
    this.setDate();
    this.state = 'prev';
    setTimeout(() => {
      this.state = '';
    }, 200);
  }

  public setDate() {
    this.selectedDate = new Date(new Date().getFullYear(), this.selectedMonth);
    this.title.month = this.getMonthLiteral(this.selectedDate);

    this.title.year = this.selectedDate.getFullYear();

    this.days = this.createDayEvents(
      this.selectedDate.getMonth(),
      this.selectedDate.getFullYear()
    );
  }
}
