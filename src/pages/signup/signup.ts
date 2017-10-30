import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/first';

import { FirebaseAuthState } from 'angularfire2';

import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { HomePage } from './../home/home';

import regex from '../../shared/regex';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  form: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userService: UserService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      user: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.compose([Validators.required, Validators.pattern(regex.regexEmail)])]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  ionViewDidLoad() {
  }

  private presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
    let loading: Loading = this.showLoading('Aguarde...')
    let formUser = this.form.value;
    let username: string = formUser.user;

    this.userService.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {
        if (!userExists) {
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          })
            .then((authState: FirebaseAuthState) => {
              delete formUser.password;
              let uuid: string = authState.auth.uid;
              this.userService.create(formUser, uuid)
                .then(() => {
                  console.log('Usuário Cadastrado');
                  this.presentToast(`Cadastro realizado com sucesso!`);
                  loading.dismiss();
                  this.navCtrl.setRoot(HomePage);
                })
                .catch((error: any) => {
                  console.log(error);
                  loading.dismiss();
                  this.showAlert(error);
                })
            })
            .catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            })
        } else {
          this.showAlert(`O usuario ${username} já está sendo utilizado.`);
          loading.dismiss();
        }
      })

  }

}
