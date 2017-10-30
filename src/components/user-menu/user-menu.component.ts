import { UserProfilePage } from './../../pages/user-profile/user-profile';
import { AlertController, MenuController, App } from 'ionic-angular';
import { Component, Input } from '@angular/core';

import { User } from './../../models/user.model';

import { AuthService } from './../../providers/auth/auth.service';

import { BaseComponent } from '../base.component';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') public currentUser: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  public onProfile(): void {
    this.navCtrl.push(UserProfilePage);
  }

}
