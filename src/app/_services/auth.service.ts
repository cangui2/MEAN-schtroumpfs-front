import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {UserService} from "./user.service";
import {any} from "codelyzer/util/function";


const AUTH_API = 'http://localhost:8080/api/auth/';
const baseUrl = 'http://localhost:8080/api/auth/update';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, age: any, famille: any, races: any, nourriture: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      age,
      famille,
      races,
      nourriture
    }, httpOptions);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  getAllListe(): Observable<any> {
    return this.http.get(AUTH_API + 'alluser')
      .pipe(map((data: any) => data || []

      ))

  };
  getUserById(id:any) {
    return this.http.get(`${AUTH_API}user/${id}`);
  }

  updateFavorie(id: any, data: any,test:any): Observable<any> {
    // @ts-ignore
    return this.http.put(`${AUTH_API}/user/test/${id}/${data}`,{headers});
  }

}

