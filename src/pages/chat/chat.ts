import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, MenuController } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Message } from './../../models/message.model';
import { Chat } from './../../models/chat.model';

import { AuthService } from './../../providers/auth/auth.service';
import { ChatService } from './../../providers/chat/chat.service';
import { MessageService } from './../../providers/message/message.service';
import { UserService } from './../../providers/user/user.service';

import firebase from 'firebase';

import 'rxjs/add/operator/first';
import { User } from './../../models/user.model';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  public messages: FirebaseListObservable<Message[]>;

  public pageTitle: string;
  public sender: User;
  public recipient: User;

  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public menuCtrl: MenuController,
    public messageService: MessageService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {
  }

  ionViewcanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }
  
  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.menuCtrl.enable(false, 'user-menu');

    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

        let doSubscription = () => {
          this.messages
            .subscribe((messages: Message[]) => {
              this.scrollToBottom();
            })
        }

        this.messages = this.messageService.
          getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .first()
          .subscribe((messages: Message[]) => {
            if (messages.length === 0) {
              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);
              doSubscription();
            } else {
              doSubscription();
            }
          })
      })
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'user-menu');
  }

  public sendMessage(newMessage: string): void {

    if (newMessage) {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(
        new Message(
          this.sender.$key,
          newMessage,
          currentTimestamp
        ),
        this.messages
      ).then(() => {
        this.chat1.
          update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          })
        this.chat2.
          update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          })
      })
    }
  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duration || 100);
      }
    }, 70);
  }

}
