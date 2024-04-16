import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-data-tab',
  standalone: true,
  imports: [],
  templateUrl: './user-data-tab.component.html',
  styleUrl: './user-data-tab.component.css'
})
export class UserDataTabComponent {
  currentUser: any;
  constructor(private auth: AuthService) { 
    this.currentUser = this.auth.currentUser;
  }

}
