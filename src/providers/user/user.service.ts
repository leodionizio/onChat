import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from './../../models/user.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserService {

  users: FirebaseListObservable<User[]>

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    this.users = this.af.database.list(`/users`);
  }

  public create(user: User): firebase.Promise<void> {
    return this.users
      .push(user);
  }

}
