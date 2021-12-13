import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";
import {DataService} from "../data.service";
import {Booking} from "../model/Booking";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/User";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings!: Array<Booking>;
  action!: string;
  selectedDate!: string;
  dataLoaded = false;
  message = '';





  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.message = 'Loading data...';
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if(!this.selectedDate){
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next => {
            this.bookings = next;
            this.dataLoaded = true;
            this.message = '';
          },
          error => this.message = 'Sorry - the data could not be loaded.'
        );
      }
    )
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams:{id}});
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id : number){
    this.message = 'Deleting please wait...';
    this.dataService.deleteBooking(id).subscribe(
      next => {
        this.message = '';
        this.loadData();

      },
      error => {
        this.message = 'Sorry there was a problem deleting the item'
      }

    );
  }

  dateChanged() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}});
  }
}
