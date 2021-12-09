import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {Booking} from "../../model/Booking";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Layout, Room} from "../../model/Room";

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

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      next => this.rooms = next
    );
    this.dataService.getUsers().subscribe(
      next => this.users = next
    );
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.dataService.getBooking(+id).subscribe(
        next => this.booking = next
      );
    } else {
      this.booking = new Booking();
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
