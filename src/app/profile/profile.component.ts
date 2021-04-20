import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {AuthService} from "../_services/auth.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  is_edit : boolean = true;

  constructor(private token: TokenStorageService,private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser)
  }
  updatePublished(status: boolean): void {
    const data = {
      age: this.currentUser.age,
      famille: this.currentUser.famille,
      races: this.currentUser.races,
      nourriture:this.currentUser.nourriture,
      published: status
    };
    console.log(data);

    this.authService.update(this.currentUser.id, data)
      .subscribe(
          (response: { message: any; }) => {
          this.currentUser.published = status;
          console.log(response);


        },
          (error: any) => {
          console.log(error);
        });
  }

}
