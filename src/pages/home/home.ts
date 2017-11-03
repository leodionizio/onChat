import { Chat } from './../../models/chat.model';
import { ChatService } from './../../providers/chat/chat.service';
import { ChatPage } from './../chat/chat';
import { SigninPage } from './../signin/signin';
import { AuthService } from './../../providers/auth/auth.service';
import { FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { UserService } from './../../providers/user/user.service';
import 'rxjs/add/operator/first';

import { User } from './../../models/user.model';

import firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public users: FirebaseListObservable<User[]>;
  public chats: FirebaseListObservable<Chat[]>;
  view: string = 'chats';

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userService: UserService
  ) { }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.chats = this.chatService.chats;
    this.users = this.userService.users;

    this.menuCtrl.enable(true, 'user-menu');
  }

  public filterItems(event: any): void {
    let searchTerm: string = event.target.value;

    this.chats = this.chatService.chats;
    this.users = this.userService.users;

    if (searchTerm) {
      switch (this.view) {
        case 'chats':
          this.chats = <FirebaseListObservable<Chat[]>>this.chats
            .map((chats: Chat[]) => chats.filter((chat: Chat) => (chat.title.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) > -1)));
          break;
        case 'usuarios':
          this.users = <FirebaseListObservable<User[]>>this.users
            .map((users: User[]) => users.filter((users: User) => (users.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) > -1)))
          break;
      }
    }
  }

  public onChatCreate(recipientUser: User): void {
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.chatService.getDeepChat(currentUser.$key, recipientUser.$key)
          .first()
          .subscribe((chat: Chat) => {
            if (chat.hasOwnProperty(`$value`)) {
              let timestamp = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, (recipientUser.photo || ''));
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, (currentUser.photo || ''))
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);

            }
          })
      })
    this.navCtrl.push(ChatPage, { recipientUser: recipientUser });
  }

  public onChatOpen(chat: Chat): void {

    let recipientUserId: string = chat.$key;
    this.userService.get(recipientUserId)
      .first()
      .subscribe((user: User) => {
        this.navCtrl.push(ChatPage, { recipientUser: user });
      })
  }

  public logout(): void {
    this.authService.logout();
    this.navCtrl.setRoot(SigninPage)
  }

}
