import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {Booking} from "../../model/Booking";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Layout, Room} from "../../model/Room";
import {map} from "rxjs";

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  booking!: Booking;
  rooms!: Array<Room>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users!: Array<User>;
  dataLoaded = false;
  message = 'Please wait...';

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rooms = this.route.snapshot.data['rooms'];
    this.users = this.route.snapshot.data['users'];

    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.dataService.getBooking(+id)
        .pipe(
          map ( booking => {
            // @ts-ignore
            booking.room = this.rooms.find ( room => room.id === booking.room.id);
            // @ts-ignore
            booking.user = this.users.find ( user => user.id === booking.user.id);
            return booking;
          })
        )
        .subscribe(
        next => {
          this.booking = next;
          this.dataLoaded = true;
          this.message = '';
        }
      );
    } else {
      this.booking = new Booking();
      this.dataLoaded = true;
      this.message = '';
    }


  }

  onSubmit(){
    if (this.booking.id != null){
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    } else {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    }

  }


}
