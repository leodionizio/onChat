import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  public currentUser: User;
  public canEdit: boolean = false;
  private filephoto: File;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public userService: UserService
  ) { }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
      })
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

  public onSubmit(event: Event): void {
    let loading: Loading = this.showLoading('Aguarde...')

    event.preventDefault();

    if (this.filephoto) {
      let uploadTask = this.userService.uploadPhoto(this.filephoto, this.currentUser.$key);

      uploadTask.on('state_changed', (snapshot) => {

      }, (error: Error) => {
        this.presentToast('Falha ao alterar a foto.')
        loading.dismiss();
      }, () => {
        this.editUser(uploadTask.snapshot.downloadURL);
        loading.dismiss();        
      })
    } else {
      this.editUser();
      loading.dismiss();
    }
  }

  public onPhoto(event): void {
    this.filephoto = event.target.files[0];
  }

  private editUser(photoUrl?: string): void {
    this.userService
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo || ''
      })
      .then(() => {
        this.canEdit = false;
        this.presentToast('Perfil atualizado.')        
      })
  }


}
