import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';

import { AuthService } from './../providers/auth/auth.service';
import { UserService } from './../providers/user/user.service';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';


const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCZDwEUGXldx2kcjIYBmIlGfUP1bnRfd2I",
  authDomain: "talkfly-5311c.firebaseapp.com",
  databaseURL: "https://talkfly-5311c.firebaseio.com",
  storageBucket: "talkfly-5311c.appspot.com",
  messagingSenderId: "1093142937640"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
