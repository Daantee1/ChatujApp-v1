import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-change-hobbies',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './change-hobbies.component.html',
  styleUrl: './change-hobbies.component.css',
})
export class ChangeHobbiesComponent {
  currentProfile: any;
  hobby: string = '';
  hobbySelected: boolean = false;
  showHobbyToAdd: boolean = false;
  show: boolean = false;
  hobbyToAdd: string = '';
  hobbyToUpdate: string = '';
  hobbiesNotTheSame: boolean = false;
  constructor(
    private auth: AuthService,
    private profileService: ProfileService
  ) {
    this.auth.currentUserProfile.subscribe((profile: any) => {
      this.currentProfile = profile.result;
    });
    console.log('Current profile:', this.currentProfile);
  }

  changeHobby(hobby: any) {
    this.hobby = hobby;
    this.hobbyToUpdate = hobby;
    console.log('Hobby to change', this.hobby);
    this.hobbySelected = true;
  }
  addHobbyButton(){
    this.showHobbyToAdd = true;
    this.show = true;
  }
  addHobby(){
    let hobbiesArray = this.currentProfile[0].hobbies.split(',');
    if (!hobbiesArray.includes(this.hobbyToAdd)) {
      hobbiesArray.push(this.hobbyToAdd);
    }
    this.currentProfile[0].hobbies = hobbiesArray.join(',');

    this.profileService
      .updateHobbies(this.currentProfile[0])
      .subscribe((profile: any) => {
        console.log('Profile updated', profile);
        this.hobbySelected = false;
        this.showHobbyToAdd = false;
        this.show = false;
      });
  }
  deleteHobby() {
    if (this.hobbyToUpdate !== this.hobby) {
      console.log(' Hobbies are not the same');
      this.hobbiesNotTheSame = true;
    } else {
      this.hobbiesNotTheSame = false;
      let hobbiesArray = this.currentProfile[0].hobbies.split(',');
      if (hobbiesArray.includes(this.hobby)) {
        const index = hobbiesArray.indexOf(this.hobby);
        if (index !== -1) {
          hobbiesArray.splice(index, 1);
        }
      }
      this.currentProfile[0].hobbies = hobbiesArray.join(',');

      this.profileService
        .updateHobbies(this.currentProfile[0])
        .subscribe((profile: any) => {
          console.log('Profile updated', profile);
          this.hobbySelected = false;
        });
    }
  }
  updateHobby() {
    let hobbiesArray = this.currentProfile[0].hobbies.split(',');
    if (hobbiesArray.includes(this.hobby)) {
      const index = hobbiesArray.indexOf(this.hobby);
      if (index !== -1) {
        hobbiesArray.splice(index, 1, this.hobbyToUpdate);
      }
    }
    this.currentProfile[0].hobbies = hobbiesArray.join(',');

    this.profileService
      .updateHobbies(this.currentProfile[0])
      .subscribe((profile: any) => {
        console.log('Profile updated', profile);
        this.hobbySelected = false;
      });
  }
}
