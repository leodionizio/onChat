import { User } from './../../models/user.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.component.html'
})
export class UserInfoComponent {

@Input() public user: User;
@Input() public isMenu: boolean = false;

  constructor() {
  }

}
