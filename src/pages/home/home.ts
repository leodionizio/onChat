import { FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from './../../providers/user/user.service';

import { SignupPage } from './../signup/signup';
import { User } from './../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public users: FirebaseListObservable<User[]>;

  constructor(
    public navCtrl: NavController,
    public userService: UserService
  ) {

  }

  ionViewDidLoad() {
    this.users = this.userService.users;
  }

  public onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  public onChatCreate(user: User): void {
    console.log(user);
  }

}
