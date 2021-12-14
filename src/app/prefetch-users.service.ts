import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {User} from "./model/User";
import {Observable} from "rxjs";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class PrefetchUsersService implements Resolve<Observable<Array<User>>>{

  constructor(private dataService: DataService) { }

  resolve(){
    return this.dataService.getUsers();
  }
}
