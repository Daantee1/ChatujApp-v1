import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';
import { Profile } from '../types/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/users'
  private apiUrlProfile = 'http://localhost:8081/api/profiles'

  loggedIn = new BehaviorSubject(false);
  currentUser = new BehaviorSubject <User[]>([]);
  currentUserArray : any
  currentUserProfile = new BehaviorSubject<Profile[]>([]);
  

  constructor(private http: HttpClient) {
   
   }

  login(email: any, password: any){
    return this.http.get(`${this.apiUrl}/login/${email}/${password}`)
  }
 
  getCurrentUserProfile(){
    return this.http.get(`${this.apiUrlProfile}/${this.currentUserArray[0].id}`)
    .subscribe((profile: any) =>{
      this.currentUserProfile.next(profile);
    })
  }
 

  
}
