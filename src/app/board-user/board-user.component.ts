import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../_services/auth.service";



@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],

})
export class BoardUserComponent implements OnInit {
  content?: string;
  public users: any
  public data: object | any
  objectKeys = Object.keys;
  constructor(private userService: UserService, private http: HttpClient,private auth :AuthService ) {
  }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.users = []
  }

  public getUsers() {
    this.auth.getAllListe()
      .subscribe(res => {

        this.data = Object.values(res); // change 'res' to 'res.data'
        console.log('-====>' +this.data);
      }, err => {
        console.log(err);
      });
  }

}
