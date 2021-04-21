import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {AuthService} from "../_services/auth.service";
import {resolveFileWithPostfixes} from "@angular/compiler-cli/ngcc/src/utils";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  is_edit : boolean = true;
  user:any;

  constructor(private token: TokenStorageService,private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser)

    const findByUser = () => {
      this.authService.getUserById(this.currentUser.id)

        .subscribe(
          (resp) => {
            console.log("on est dedant");
            this.user = resp;
            console.log(this.currentUser);
          }
        )
    }
    findByUser();
  }

  updatePublished(status: boolean): void {
    const data = {
      age: this.user.age,
      famille: this.user.famille,
      races: this.user.races,
      nourriture:this.user.nourriture,
      published: status
    };
    console.log(data);

    this.authService.update(this.currentUser.id, data)
      .subscribe(
          (response: { message: any; }) => {
          this.user.published = status;
          console.log(response);
        },
          (error: any) => {
          console.log(error);
        });



  }


}
