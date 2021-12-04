import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  selectedUser!: User;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router){ }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      next => {
        this.users = next;
      }
    );
    this.route.queryParams.subscribe(
      (param) => {
        const id = param['id'];
        if(id){
          this.selectedUser = <User>this.users.find(user => user.id === +id);
        }
      }
    );
  }

  setUser(id: number){
    this.router.navigate(['admin', 'users'], {queryParams:{id}});
  }

}
