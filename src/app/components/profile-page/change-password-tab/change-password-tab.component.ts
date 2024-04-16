import { Component } from '@angular/core';
import { User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password-tab',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password-tab.component.html',
  styleUrl: './change-password-tab.component.css',
})
export class ChangePasswordTabComponent {
  user = {
    oldPassword: '',
    password: '',
    passwordC: '',
  };

  currentUser: any;
  passwordDoNotMatch = false;
  oldPasswordIncorrect = false;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    this.currentUser = this.auth.currentUser;
  }

  isPasswordMatch() {
    if (this.user.password === this.user.passwordC) {
      return true;
    } else {
      this.passwordDoNotMatch = true;
      return false;
    }
  }

  changePassword() {
    if (this.passwordDoNotMatch === false) {
      console.log(this.currentUser[0].id)
      this.userService
        .checkPassword(this.user.oldPassword, this.currentUser[0].id)
        .subscribe((response: any) => {
          if (response.status === false) {
            this.oldPasswordIncorrect = true;
            console.log('Password incorrect');
          } else {
            this.userService
              .updatePassword(this.user.password, this.currentUser[0].id)
              .subscribe((response: any) => {
                if (response.status === true) {
                  console.log('Password changed');
                  this.router.navigate(['/login-page']);
                }
              });
          }
        });
    }
  }
}
