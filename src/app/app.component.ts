import { HomePage } from './../pages/home/home';
import { FirebaseAuthState } from 'angularfire2';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from './../models/user.model';
import { AuthService } from './../providers/auth/auth.service';
import { UserService } from './../providers/user/user.service';

import { SigninPage } from './../pages/signin/signin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  currentUser: User;

  constructor(
    authService: AuthService,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    userService: UserService
  ) {

    authService.auth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        this.rootPage = HomePage;
        userService.currentUser
          .subscribe((user: User) => {
            this.currentUser = user;
          })
      } else {
        this.rootPage = SigninPage;
      }
    })


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    // console.log(this.authService.authenticated)

  }
}

