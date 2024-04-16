import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';
import { UserDataTabComponent } from "./user-data-tab/user-data-tab.component";
import { ProfileDataTabComponent } from "./profile-data-tab/profile-data-tab.component";
import { ChangeHobbiesComponent } from "./change-hobbies-tab/change-hobbies.component";
import { ChangePasswordTabComponent } from "./change-password-tab/change-password-tab.component";
import { DeleteAccountTabComponent } from "./delete-account-tab/delete-account-tab.component";
import { FriendsListTabComponent } from "./friends-list-tab/friends-list-tab.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css',
    imports: [NgClass, UserDataTabComponent, ProfileDataTabComponent, ChangeHobbiesComponent, ChangePasswordTabComponent, DeleteAccountTabComponent, FriendsListTabComponent]
})
export class ProfilePageComponent {

  currentUser: any;
  selectedTab = 'Dane użytkownika'

  constructor(private auth: AuthService) {
    this.currentUser = this.auth.currentUser;
   }


}
