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

import { AngularFireModule } from 'angularfire2';

// arquivo de configurações do firebase, que vc obtém através do seu console no próprio firebase
// importado de outro arquivo restrito.
import firebaseAppConfig from './firebase.config';
//
//ou pode ser declarado aqui seguindo o exemplo:
// const firebaseAppConfig: FirebaseAppConfig = {
//  apiKey: " /// ",
//  authDomain: " /// ",
//  databaseURL: " /// ",
//  storageBucket: " /// ",
//  messagingSenderId: " /// "
// }

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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
