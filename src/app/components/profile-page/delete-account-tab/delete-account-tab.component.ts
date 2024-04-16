import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-delete-account-tab',
  standalone: true,
  imports: [],
  templateUrl: './delete-account-tab.component.html',
  styleUrl: './delete-account-tab.component.css',
})
export class DeleteAccountTabComponent {
  deleteAccountAlert: boolean = false;
  deleteAccountConfirmationAlert: boolean = false;
  accountDeletedSucesfully: boolean = false;
  currentUser: any;

  constructor(private router: Router, private userService: UserService, private auth: AuthService, private profileService: ProfileService) {
    this.currentUser = this.auth.currentUser;
  }

  deleteAccountButton() {
    this.deleteAccountAlert = true;
  }

  deleteAccountConfirmation() {
    this.deleteAccountConfirmationAlert = true;
    setTimeout(() => {
      console.log('Account deleted');
      this.accountDeletedSucesfully = true;
      setTimeout(() => {
        this.profileService.deleteProfile(this.currentUser[0].id).subscribe();
          this.userService.deleteUser(this.currentUser[0].id)
          .subscribe((response: any) => {
            if (response.status === true) {
              this.router.navigate(['/login-page']);
            }
          });
      }, 2000);
    }, 3000);
  }
}
