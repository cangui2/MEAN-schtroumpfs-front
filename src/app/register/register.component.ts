import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null,
    age: null,
    famille:null,
    races:null,
    nourriture:null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private currentUser: any;
  private favorieId: any;
  private data: unknown[] | undefined;
  private speudo: any;


  constructor(private authService: AuthService,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onSubmit(): void {
    const {username, email, password, age, famille, races, nourriture} = this.form;
    console.log(this.form);
    if (!this.currentUser) {
      this.authService.register(username, email, password, age, famille, races, nourriture).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    } else if (this.currentUser) {
      console.log("dans else if")
      this.authService.register(username, email, password, age, famille, races, nourriture).subscribe(
        data => {
          console.log(data);
          this.favorieId=data
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.addFavorie(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );

    }

    }
  addFavorie(favorieId:any){

    this.authService.updateFavorie(this.currentUser.id,favorieId)
      .subscribe(val=>{
          console.log(val);
        }
      )


  }


}
