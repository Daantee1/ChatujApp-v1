import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  @Input() messages: string[] = [];
  messagesFromOtherUsers: string[] = [];

  currentUser: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    Pusher.logToConsole = true;

    const pusher = new Pusher('4d788afbd3ea61da9e5d', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('data', (data: any) => {
      const foundUser = data.user[0];
      if (foundUser.id === this.currentUser[0].id) {
        console.log('Wiadomość od aktualnego użytkownika');
      } else {
        this.messagesFromOtherUsers.push(data.message);
        console.log('Wiadomość od innego użytkownika');
      }
    });
  }
}
