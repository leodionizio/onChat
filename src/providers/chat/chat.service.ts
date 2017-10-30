import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';

import { Chat } from './../../models/chat.model';
import { BaseService } from './../base/base.service';

@Injectable()
export class ChatService extends BaseService {

  public chats: FirebaseListObservable<Chat[]>;

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    super();
    this.setChats();
  }

  private setChats(): void {
    this.af.auth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        this.chats = <FirebaseListObservable<Chat[]>>this.af.database.list(`/chats/${authState.auth.uid}`, {
          query: {
            orderByChild: 'timestamp'
          }
        }).map((chats: Chat[]) => {
          return chats.reverse();
        }).catch(this.handleObservableError);
      }
    })
  }

  public create(chat: Chat, userId1: string, userId2: string): firebase.Promise<void> {
    return this.af.database.object(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  public getDeepChat(userId1: string, userId2: string): FirebaseObjectObservable<Chat> {
    return <FirebaseObjectObservable<Chat>>this.af.database.object(`/chats/${userId1}/${userId2}`)
      .catch(this.handleObservableError);
  }

}
