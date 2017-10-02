import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FirebaseAuthState } from 'angularfire2';

import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user.model';

import regex from '../../shared/regex';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  form: FormGroup;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      user: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.compose([Validators.required, Validators.pattern(regex.regexEmail)])]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  ionViewDidLoad() {
  }

  public onSubmit(): void {
    let user: User = new User(
      this.form.value.name,
      this.form.value.user,
      this.form.value.email,
      this.form.value.pass
    )

    this.authService.createAuthUser({
      email: user.email,
      password: user.pass
    }).then((authState: FirebaseAuthState) => {
      this.userService.create(user)
        .then(() => {
          console.log('cadastrado');
        })
    })


  }

}
