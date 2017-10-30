import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from './../../providers/auth/auth.service';
import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';

import regex from '../../shared/regex';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  form: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.compose([Validators.required, Validators.pattern(regex.regexEmail)])]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  private showLoading(message: string): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: message
    })
    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present()
  }

  public onSubmit(): void {
    let loading = this.showLoading('Aguarde...');
    this.authService.signinWithEmail(this.form.value)
      .then((isLogged: boolean) => {
        if (isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.showAlert(error);
        loading.dismiss();
      })
  }

  public onSignup(): void {
    this.navCtrl.push(SignupPage);
  }


}
