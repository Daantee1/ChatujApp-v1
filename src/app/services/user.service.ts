import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081/api/users'

  userData: User[] = []
  userDataObs = new BehaviorSubject(this.userData);
  

  constructor(private http: HttpClient) { }

  checkEmail(email: string){
   return this.http.get(`${this.apiUrl}/checkEmail/${email}`)
  }
  checkUsername(username: string){
    return this.http.get(`${this.apiUrl}/checkUsername/${username}`)
  }

  addUser(user: User){
    this.userData.push(user);
    this.userDataObs.next(this.userData);
  }

  register(user: User){
    return this.http.post(`${this.apiUrl}/add`, user);

  }
  getUser(){
    return this.http.get(this.apiUrl)
  }
  checkPassword(password: any, id: any){
    return this.http.get(`${this.apiUrl}/checkPassword/${id}/${password}`)
  
  }
  updatePassword(password: any, id: any){
    return this.http.put(`${this.apiUrl}/updatePassword/${id}`, {password: password})
  }
  deleteUser(id: any){
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }

  


}
