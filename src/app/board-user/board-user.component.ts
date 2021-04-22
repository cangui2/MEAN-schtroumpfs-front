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
  public fav:any;

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
    const findByUser = () => {
      this.auth.getUserById(this.currentUser.id)

        .subscribe(
          (resp) => {
            console.log("on est dedant");
            this.users = resp;
            console.log(resp);
            console.log(this.users.favorie);
            this.fav=this.users.favorie
          }
        )
    }
    findByUser();
  }


addFavorie(favorieId:any){

  this.auth.updateFavorie(this.currentUser.id,favorieId)
    .subscribe(val=>{
      console.log(val);
      }
    )
  this.reloadPage()

}
  removeFavorie(favorieId:any){

    this.auth.removeFavorie(this.currentUser.id,favorieId)
      .subscribe(val=>{
          console.log(val);
        }
      )
    this.reloadPage()
  }
  checkUser(id:any){
    return this.fav.indexOf(id) > -1;
  }
  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }




}
