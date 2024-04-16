import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile-data-tab',
  standalone: true,
  imports: [NgClass],
  templateUrl: './profile-data-tab.component.html',
  styleUrl: './profile-data-tab.component.css'
})
export class ProfileDataTabComponent {
  currentProfile: any;
  constructor(private auth: AuthService) { 
    this.auth.currentUserProfile.subscribe((profile: any) => {
      this.currentProfile = profile.result;

      if(this.currentProfile[0].gender === 'male'){
        this.currentProfile[0].gender = 'Mężczyzna';
      }else{
        this.currentProfile[0].gender = 'Kobieta';
      }
    });
    console.log('Current profile:', this.currentProfile);

  
  }

  

}
