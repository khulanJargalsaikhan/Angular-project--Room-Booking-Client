import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms!: Array<Room>;
  private users!: Array<User>;

  getRooms() : Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers() : Observable<Array<User>>  {
    return of(this.users);
  }

  constructor() {
    this.rooms = new Array<Room>();

    //creating a room
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First Room';
    room1.location = 'First Floor';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);

    //creating second room
    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.location = 'Third Floor';

    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;

    room2.capacities.push(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);


    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 1;
    user1.name = 'John';

    const user2 = new User();
    user2.id = 2;
    user2.name = 'Sara';

    this.users.push(user1);
    this.users.push(user2);
  }
}