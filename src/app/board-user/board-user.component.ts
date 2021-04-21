import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";



@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],

})
export class BoardUserComponent implements OnInit {
  currentUser: any;
  public users: any
  public data: object | any
  public favorieId: any;
  constructor(private userService: UserService, private http: HttpClient,private auth :AuthService,private token: TokenStorageService ) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  const getUsers=()=> {
      this.auth.getAllListe()
        .subscribe(res => {

          this.data = Object.values(res); // object value

        }, err => {
          console.log(err);
        });
    }
    getUsers();

  }


addFavorie=()=>{
  const favorieId = this.data.id
    // @ts-ignore
  this.auth.updateFavorie(this.currentUser.id,favorieId)
    .subscribe(val=>{
      console.log(val);
      }
    )
}






}
